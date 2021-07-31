import os
import shutil

import unittest
import json

from fdz import fdz
from fdz.note_parser import parse_string

SAMPLE_NOTES = "tests/sample_notes"

class TestFileActions(unittest.TestCase):
    """Tests for `fdz.fileactions` functions."""

    def test_parse_comment(self):
        """Test Directory Initialization."""
        comment_string = '<title>testing'
        parse_comment = parse_string(comment_string)
        self.assertEqual(parse_comment, [{'section':'title', 'text':['testing']}])

    def test_multiline_string(self):
        uncommented_string = '''<title>hello my <friend
wr u
<content>
hello'''
        parse_uncommented = parse_string(uncommented_string)
        self.assertEqual(parse_uncommented, [{'section':'title', 'text':['hello my <friend','wr u']}, {'section':'content','text':['hello']}])
        
    def test_sections_with_missing_comment_or_text(self):
        """test sections missing comment or text"""
        double_comment_string='''<title><title>'''
        parse_double=parse_string(double_comment_string)
        self.assertEqual(parse_double, [])

        text_comment="hello<title>"
        parse_text_comment=parse_string(text_comment)
        print(parse_text_comment)
        self.assertEqual(parse_text_comment, [])
        text_comment_text="hello<title>hello"
        parse_text_comment_text=parse_string(text_comment_text)
        self.assertEqual(parse_text_comment_text, [{'section':'title','text':['hello']}])

    def test_parse_delimiter(self):
        delim_string='''<title delim ","> hello'''
        delim_parse = parse_string(delim_string)
        expected = [{'section':'title','delimiter':',','text':['hello']}]
        self.assertEqual(delim_parse,expected)

    def test_strip_headers(self):
        header_string='''<title> ### hello '''
        header_parse=parse_string(header_string)
        expected = [{'section':'title', 'text':['hello']}]
        self.assertEqual(header_parse, expected)

    def test_full_note(self):
        full_note=None
        parsed_note_sample=None
        with open(f'{SAMPLE_NOTES}/zettl_1.md', 'r') as f:
            full_note = f.read()
        with open(f'{SAMPLE_NOTES}/zettl_1_parse.json', 'r') as fj:
            parsed_note_sample = json.load(fj)
        full_note_parse = parse_string(full_note)
        print(full_note_parse)
        self.assertEqual(full_note_parse, parsed_note_sample)

