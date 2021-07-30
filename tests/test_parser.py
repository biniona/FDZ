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
        self.assertEqual(parse_comment, [('title', ['testing'])])

    def test_multiline_string(self):
        uncommented_string = '''<title>hello my <friend
wr u
<content>
hello'''
        parse_uncommented = parse_string(uncommented_string)
        self.assertEqual(parse_uncommented, [('title', ['hello my <friend','wr u']), ('content',['hello'])])
        
    def test_sections_with_missing_comment_or_text(self):
        """test sections missing comment or text"""
        double_none = [(None,None), (None,None)]
        double_comment_string='''<title><title>'''
        parse_double=parse_string(double_comment_string)
        self.assertEqual(parse_double, double_none)

        text_comment="hello<title>"
        parse_text_comment=parse_string(text_comment)
        print(parse_text_comment)
        self.assertEqual(parse_text_comment, double_none)
        text_comment_text="hello<title>hello"
        parse_text_comment_text=parse_string(text_comment_text)
        self.assertEqual(parse_text_comment_text, [(None,None), ('title',['hello'])])

    def test_parse_delimiter(self):
        delim_string='''<title delimiter ","> hello'''
        delim_parse = parse_string(delim_string)
        expected = [({'section':'title','delimiter':','}, ['hello'])]
