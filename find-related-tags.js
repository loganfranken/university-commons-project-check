'use strict';

const projects = require('./universitycommons.io/data/projects');

const sourceUrl = process.argv[2];

// First, find the tags for this project
let targetTags = (projects.find(project => project.sourceUrl === sourceUrl)).tags;

// Second, find other projects with the same tags
let relatedTags = [];
projects.forEach(project => {

  if(project.sourceUrl === sourceUrl)
  {
    // Don't add the tags from the project itself
    return;
  }

  // Is there a matching tag?
  let hasMatchingTag = false;
  project.tags.forEach(tag => {

    targetTags.forEach(targetTag => {
      if(tag === targetTag)
      {
        hasMatchingTag = true;
      }
    });

  });

  // Add tags to the "related tags" list
  if(hasMatchingTag)
  {
    project.tags.forEach(tag => {

      if(relatedTags[tag])
      {
        relatedTags[tag] = (relatedTags[tag] + 1);
      }
      else
      {
        relatedTags[tag] = 1;
      }

    });
  }

});

console.log(relatedTags);
