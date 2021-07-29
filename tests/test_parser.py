import os
import shutil

import unittest

from fdz import fdz
from fdz.note_parser import parse_string

class TestFileActions(unittest.TestCase):
    """Tests for `fdz.fileactions` functions."""

    def test_parse_comment(self):
        """Test Directory Initialization."""
        comment_string = '<title>testing'
        parse_comment = parse_string(comment_string)
        print(parse_comment)
        self.assertEquals(parse_comment, [('title', ['testing'])])
        uncommented_string = '''hello my friend
wr u
<content>
hello'''
        parse_uncommented = parse_string(uncommented_string)
        self.assertEquals(parse_uncommented, [(None, ['hello my friend\nwr u\n']), ('content',['hello'])])
