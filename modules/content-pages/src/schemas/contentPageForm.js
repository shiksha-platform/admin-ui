const contentPageForm = {
  type: "object",
  required: ["pageTitle", "urlSlug"],
  properties: {
    pageTitle: {
      title: "Title",
      type: "string",
    },
    urlSlug: {
      title: "URL Slug",
      type: "string",
    },
    blocks: {
      title: "Configure blocks",
      type: "array",
      items: {
        type: "object",
        properties: {
          blockType: {
            title: "Block type",
            type: "string",
            enum: ["Richtext", "Image", "Collapsible"],
            default: "Richtext",
          },
        },
        dependencies: {
          blockType: {
            oneOf: [
              {
                properties: {
                  blockType: {
                    enum: ["Collapsible"],
                  },
                  collapsibleHeader: {
                    title: "Heading",
                    type: "string",
                  },
                  collapsibleContent: {
                    title: "Content",
                    type: "string",
                  },
                },
              },
              {
                properties: {
                  blockType: {
                    enum: ["Richtext"],
                  },
                  richtextholder: {
                    title: "Richtext",
                    type: "string",
                  },
                },
              },
              {
                properties: {
                  blockType: {
                    enum: ["Image"],
                  },
                  imgSrc: {
                    title: "Source",
                    type: "string",
                    format: "uri",
                  },
                  imageCaption: {
                    title: "Image Caption",
                    type: "string",
                  },
                },
              },
            ],
          },
        },
      },
    },
  },
};

export default contentPageForm;
