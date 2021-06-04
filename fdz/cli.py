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

@cli.command()
def init():
    fa.safe_init()

if __name__ == "__main__":
    sys.exit(cli())