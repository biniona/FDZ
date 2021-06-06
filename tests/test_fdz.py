#!/usr/bin/env python

"""Tests for `fdz` package."""

import unittest
import os

from click.testing import CliRunner
from tests import clean_up

from fdz import fdz
from fdz import cli
from fdz import file_actions as fa



class TestFdz(unittest.TestCase):
    """Tests for `fdz` package."""

    @clean_up
    def test_i(self):
        """Test init command"""
        runner = CliRunner()
        z_result = runner.invoke(cli.cli, ['i'])
        assert z_result.exit_code == 0
        assert fa.DEFAULT_ZETTL_NAME in z_result.output

    @clean_up
    def test_d(self):
        """Test daily command"""
        runner = CliRunner()
        i_result = runner.invoke(cli.cli, ['i'])
        os.chdir(fa.DEFAULT_ZETTL_NAME)
        d_result = runner.invoke(cli.cli, ['d'])
        assert d_result.exit_code == 0
        assert (fa.DAILY in d_result.output)

    def test_command_line_interface(self):
        """Test the CLI."""
        runner = CliRunner()
        result = runner.invoke(cli.cli)
        assert result.exit_code == 0
        help_result = runner.invoke(cli.cli, ['--help'])
        assert help_result.exit_code == 0
        assert '--help  Show this message and exit.' in help_result.output
