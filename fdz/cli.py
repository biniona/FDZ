"""Console script for fdz."""
import sys
import click
import fdz.file_actions as fa

@click.group()
def cli():
    pass

@cli.command(name = "d")
@fa.check_is_init
def daily():
    path = fa.new_daily_note()
    if path:
        click.echo(f"New daily note: {path}")
    else:
        click.echo("Daily note already exists")

@cli.command(name = "i")
def init():
    fa.safe_init()

@cli.command(name = "z")
@click.option('--card','-c', 'card', prompt=True, required=True, type=str)
@fa.check_is_init
def zettl(card):
    path = fa.new_zettl_note(*card.split("."))
    if path:
        click.echo(f"New zettl note: {path}")
    else:
        pass

@cli.command(name = "b")
@click.option('--author','-a', 'author', prompt=True, required=True, type=str)
@click.option('--date', '-d', 'date', prompt=True, required=True, type=str)
@click.option('--extra', '-e', 'extra', default="", required=False, type=str)
@fa.check_is_init
def bib(author, date, extra):
    fa.new_bib_note(date, author, extra)

if __name__ == "__main__":
    sys.exit(cli())