"""Console script for fdz."""
import sys
import os
import click
import fdz.file_actions as fa

@click.group(chain=True)
@click.pass_context
def cli(ctx):
    ctx.ensure_object(dict)

@cli.command(name = "i")
@click.option('--name','-n', 'name', required=False, type=str)
def init(name = None):
    """Initialize your zettelkesten directory."""
    path = fa.safe_init(name)
    click.echo(path)
    if os.getenv(fa.ZETTL_ENV_VAR):
        cur_zettl_path = os.getenv(fa.ZETTL_ENV_VAR)
        if cur_zettl_path != path:
            click.echo(f"Update your {fa.ZETTL_ENV_VAR} environment variable to {path} in your shell's initialization file")
    else:
        click.echo(f"Set the {fa.ZETTL_ENV_VAR} environement variable to {path} in your shell's initialization file")
    return path

@cli.command(name = "d")
@click.pass_context
def daily(ctx):
    """Make a new daily note. This is where you can keep throwaway notes by day."""
    return _file_creation_helper(ctx, fa.new_daily_note())

@cli.command(name = "z")
@click.option('--card','-c', 'card', prompt=True, required=True, type=str)
@click.pass_context
def zettl(ctx, card):
    """Make a new permanent note card. This is where you put a fully formed idea."""
    return _file_creation_helper(ctx, fa.new_zettl_note(*card.split(".")))

@cli.command(name = "b")
@click.option('--author','-a', 'author', prompt=True, required=True, type=str)
@click.option('--date', '-d', 'date', prompt=True, required=True, type=str)
@click.option('--extra', '-e', 'extra', default="", required=False, type=str)
@click.pass_context
def bib(ctx, author, date, extra):
    """Make a new bibliographic entry. This is where you keek
    notes on a specific piece of media."""
    return _file_creation_helper(ctx, fa.new_bib_note(date, author, extra))

@cli.command(name = "o")
@click.pass_context
def open(ctx):
    """Open a file after creating it."""
    if ctx.obj.get('PATH'):
        fa.open_file(ctx.obj['PATH'])
    elif ctx.obj.get("ABORT_OPEN"):
        # fail silently, if this is set something earlier should give appropriate message
        return
    else:
        click.echo("No path specified. HINT: This command is intended to be used with file creation commands.")

def _file_creation_helper(ctx, path):
    """Helper for file creation events. Handles aborting the open command and setting path."""
    if path:
        click.echo(path)
        ctx.obj["PATH"] = path
        return path
    else:
        ctx.obj["ABORT_OPEN"] = True

if __name__ == "__main__":
    sys.exit(cli())