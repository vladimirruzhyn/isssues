import { Issue } from '../models/issue.model';

export const expectedGetData: Issue[] = [
  {
    id: 1,
    title: 'This is an item',
    text: 'This is a description of the item, it mightdescribe a bug/task/comment, itcan also display <a href=” www.google.com ”>Links</a>”',
    tags: ['bug'],
  },
  {
    id: 2,
    title: 'This is an item',
    text: 'This is a description of the item, it mightdescribe a bug/task/comment, itcan also display <a href=” www.google.com ”>Links</a>”',
    tags: ['issue', 'etc'],
  },
  {
    id: 3,
    title: 'This is an item',
    text: 'This is a description of the item, it mightdescribe a bug/task/comment, itcan also display <a href=” www.google.com ”>Links</a>”',
    tags: ['test', 'help'],
  },
];

export const tagList: string[] = ['bug', 'issue', 'etc', 'test', 'help'];

export const addTagResult: string[] = ['bug', 'issue', 'etc', 'test', 'help', 'unsuported'];

export const newTag = 'unsuported';
