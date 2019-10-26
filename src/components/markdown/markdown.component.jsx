import React from 'react';

const wrapMarkup = html => ({
  __html: html,
});

const Markdown = (props) => {
  const { content } = props;
  return (
    <div dangerouslySetInnerHTML={wrapMarkup(content)} />
  );
};

export default Markdown;
