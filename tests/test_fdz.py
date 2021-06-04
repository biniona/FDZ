#!/usr/bin/env python

"""Tests for `fdz` package."""


import unittest
from click.testing import CliRunner

from fdz import fdz
from fdz import cli


class TestFdz(unittest.TestCase):
    """Tests for `fdz` package."""

    def setUp(self):
        """Set up test fixtures, if any."""

    def tearDown(self):
        """Tear down test fixtures, if any."""

    def test_000_something(self):
        """Test something."""

    def test_command_line_interface(self):
        """Test the CLI."""
        runner = CliRunner()
        result = runner.invoke(cli.cli)
        assert result.exit_code == 0
        help_result = runner.invoke(cli.cli, ['--help'])
        assert help_result.exit_code == 0
        assert '--help  Show this message and exit.' in help_result.output
