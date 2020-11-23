const editorConfig = {
  toolbar: [
    'heading',
    'bold',
    'italic',
    'link',
    'numberedList',
    'bulletedList',
    'undo',
    'redo',
  ],
  heading: {
    options: [
      {
        model: 'paragraph',
        title: 'Paragraph',
        class: 'ck-heading_paragraph',
      },
      {
        model: 'heading3',
        view: 'h3',
        title: 'Heading 1',
        class: 'ck-heading_heading3',
      },
      {
        model: 'heading4',
        view: 'h4',
        title: 'Heading 2',
        class: 'ck-heading_heading4',
      },
      {
        model: 'heading5',
        view: 'h5',
        title: 'Heading 3',
        class: 'ck-heading_heading5',
      },
    ],
  },
  link: {
    addTargetToExternalLinks: true,
  },
}

export default editorConfig
