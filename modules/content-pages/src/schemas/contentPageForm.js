const contentPageForm = {
  type: "object",
  required: ["title"],
  properties: {
    title: {
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
            enum: ["richtext", "image", "collapsible"],
            enumNames: ["Richtext", "Image", "Collapsible"],
            default: "richtext",
          },
        },
        dependencies: {
          blockType: {
            oneOf: [
              {
                properties: {
                  blockType: {
                    enum: ["collapsible"],
                  },
                  blockData: {
                    type: "object",
                    title: "",
                    properties: {
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
                },
              },
              {
                properties: {
                  blockType: {
                    enum: ["richtext"],
                  },
                  blockData: {
                    type:"object",
                    title: "",
                    properties:{
                      richtextData:{
                        title: "Richtext",
                        type: "string",
                      }
                    }
                  },
                },
              },
              {
                properties: {
                  blockType: {
                    enum: ["image"],
                  },
                  blockData: {
                    type: "object",
                    title: "",
                    properties: {
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
