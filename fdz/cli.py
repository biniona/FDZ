"""Console script for fdz."""
import sys
import click
import fdz.file_actions as fa

@click.group()
def cli():
    pass

@cli.command(name = "d")
def daily():
    fa.new_daily_note()

@cli.command(name = "i")
def init():
    fa.safe_init()

@cli.command(name = "z")
def zettl():
	fa.new_zettl_note()

@cli.command(name = "b")
@click.option('--author','-a', 'author', required=True, type=str)
@click.option('--date', '-d', 'date', required=True, type=str)
@click.option('--extra', '-e', 'extra', default="", required=False, type=str)
def bib(author, date, extra):
	fa.new_bib_note(date, author, extra)

if __name__ == "__main__":
    sys.exit(cli())