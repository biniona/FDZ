#!/usr/bin/env python

"""Tests file creation events"""

import os
import shutil

import unittest

from fdz import fdz
from fdz import file_actions
from tests import clean_up

class TestFileActions(unittest.TestCase):
    """Tests for `fdz.fileactions` functions."""

    @clean_up
    def test_init(self):
        """Test Directory Initialization."""
        file_actions.safe_init()
        root = file_actions.DEFAULT_DIR_STRUCTURE["name"]
        self.assertTrue(os.path.exists(root))
        for k,v in file_actions.DEFAULT_DIR_STRUCTURE["contents"].items():
            check = k
            if v.get("name"):
                check = v.get("name")
            self.assertTrue(os.path.exists(f"{root}/{check}"))

    @clean_up
    def test_double_init(self):
        self.assertTrue(file_actions.safe_init())
        self.assertFalse(file_actions.safe_init())

    @clean_up
    def test_different_dir_name(self):
        # test passed in file name
        test_file_name = "test-file-for-friends"
        self.assertTrue(file_actions.safe_init(test_file_name))
        self.assertTrue(os.path.exists(test_file_name))
    
    @clean_up
    def test_is_init(self):
        self.assertFalse(file_actions.is_init())
        path = file_actions.safe_init()
        os.chdir(path)
        self.assertTrue(file_actions.is_init())
        os.chdir("..")

    def test_make_path(self):
        self.assertEqual(file_actions.make_path(".txt", "1","2","3"), "1/2/3.txt")
        self.assertEqual(file_actions.make_path("","1"),"1")

    @clean_up
    def test_date(self):
        with self.assertRaises(OSError):
            self.assertFalse(file_actions.new_daily_note())
        os.chdir(file_actions.safe_init())
        path = file_actions.new_daily_note()
        self.assertTrue(os.path.exists(path))
        self.assertFalse(file_actions.new_daily_note())

    @clean_up
    def test_bib_note(self):
        with self.assertRaises(OSError):
            self.assertFalse(file_actions.new_bib_note("2021", "smith"))
        os.chdir(file_actions.safe_init())
        path = file_actions.new_bib_note("2021", "daniels")
        self.assertEqual(path, f"{file_actions.BIB}/2021daniels.md")
        self.assertTrue(os.path.exists(path))
        self.assertFalse(file_actions.new_bib_note("2021", "daniels"))

    @clean_up
    def test_zettl_note(self):
        with self.assertRaises(OSError):
            self.assertFalse(file_actions.new_zettl_note(1,2,3,4,5))
        os.chdir(file_actions.safe_init())
        path = file_actions.new_zettl_note(1,2,3,4)
        self.assertEqual(path, f"{file_actions.ZETTL}/1-2-3-4.md")
        self.assertTrue(os.path.exists(path))
        with self.assertRaises(ValueError):
            file_actions.new_zettl_note(1,2,3,4)
        with self.assertRaises(ValueError):
            file_actions.new_zettl_note("1","2",3,4)


