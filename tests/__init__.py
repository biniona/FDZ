"""Unit test package for fdz."""
import functools
import os
import shutil

from fdz.file_actions import ZETTL_ENV_VAR

TEST_FILE_EVENTS_DIR = "__test_file_actions_dir__"

def clean_up(func):
    """wrapper for making a testing environment for file events"""
    @functools.wraps(func)
    def wrapper_cleanup(*args,**kwargs):
        if os.path.exists(TEST_FILE_EVENTS_DIR):
            raise ValueError("temporary test directory should not exist, abort testing")
        current_directory = os.getcwd()
        os.environ[ZETTL_ENV_VAR] = "" 
        os.makedirs(TEST_FILE_EVENTS_DIR)
        os.chdir(TEST_FILE_EVENTS_DIR)
        print(current_directory)
        try:
            result = func(*args, **kwargs)
            return result
        finally:
            os.chdir(current_directory)
            shutil.rmtree(TEST_FILE_EVENTS_DIR)
    return wrapper_cleanup
