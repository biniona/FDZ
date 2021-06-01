#!/usr/bin/env python

"""Tests file creation events"""

import os
import shutil
import functools

import unittest

from fdz import fdz
from fdz import file_actions


TEST_FILE_EVENTS_DIR = "__test_file_actions_dir__"


def clean_up(func):
    """creates an empty test dire"""
    @functools.wraps(func)
    def wrapper_cleanup(*args,**kwargs):
        if os.path.exists(TEST_FILE_EVENTS_DIR):
            raise ValueError("temporary test directory should not exist, abort testing")
        os.makedirs(TEST_FILE_EVENTS_DIR)
        os.chdir(TEST_FILE_EVENTS_DIR)
        try:
            result = func(*args, **kwargs)
            return result
        finally:
            os.chdir("..")
            shutil.rmtree(TEST_FILE_EVENTS_DIR)
    return wrapper_cleanup

class TestFileActions(unittest.TestCase):
    """Tests for `fdz.fileactions` functions."""

    @clean_up
    def test_init(self):
        """Test Directory Initialization."""
        file_actions.safe_initializer()
        root = file_actions.DEFAULT_DIR_STRUCTURE["name"]
        self.assertTrue(os.path.exists(root))
        for k,v in file_actions.DEFAULT_DIR_STRUCTURE["contents"].items():
            check = k
            if v.get("name"):
                check = v.get("name")
            self.assertTrue(os.path.exists(f"{root}/{check}"))

    @clean_up
    def test_double_init(self):
        self.assertTrue(file_actions.safe_initializer())
        self.assertFalse(file_actions.safe_initializer())

    @clean_up
    def test_different_dir_name(self):
        # test passed in file name
        test_file_name = "test-file-for-friends"
        self.assertTrue(file_actions.safe_initializer(test_file_name))
        self.assertTrue(os.path.exists(test_file_name))
    
    @clean_up
    def test_bad_dir_name(self):
        # test bad dictionary
        with self.assertRaises(ValueError):
            file_actions.safe_initializer(None, {"test" : "bad"})
