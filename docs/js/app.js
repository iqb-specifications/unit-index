
    const schema = {
  "asyncapi": "2.5.0",
  "info": {
    "title": "unit-index",
    "description": "Specification for the main data file for assessment units.",
    "license": {
      "name": "CC0 1.0",
      "url": "https://creativecommons.org/publicdomain/zero/1.0/"
    },
    "version": " - click on schema id to expand",
    "contact": {
      "name": "Home of iqb-specifications (German only)",
      "url": "https://iqb-specifications.github.io/"
    }
  },
  "channels": {
    "iqb_data_structures": {
      "subscribe": {
        "operationId": "Please select one schema",
        "message": {
          "messageId": "select_schema",
          "x-parser-message-name": "select_schema"
        }
      }
    }
  },
  "components": {
    "schemas": {
      "unit_index": {
        "$id": "unit-index@18.1",
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Unit Index",
        "description": "Specification for the main data file for assessment units.",
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "Short name/key/id of the unit as used in a specific testing.",
            "examples": [
              "ME2236a01",
              "G7224_py"
            ],
            "x-parser-schema-id": "<anonymous-schema-1>"
          },
          "uuid": {
            "type": "string",
            "description": "Optional universal id to identify versions and variants in many different assessments.",
            "examples": [
              "d19188fc-02e3-439e-9ff9-4f8280f9f01c",
              "https://w3id.org/iqb/unit/e4r5t6z7"
            ],
            "x-parser-schema-id": "<anonymous-schema-2>"
          },
          "modifiedAt": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp of last change. This is related to the index, not to the separate data blocks.",
            "examples": [
              "2026-04-09T13:15:10.977Z"
            ],
            "x-parser-schema-id": "<anonymous-schema-3>"
          },
          "label": {
            "type": "string",
            "description": "This data is usually taken as readable name or title in lists",
            "examples": [
              "Ein wunderbarer Ausflug",
              "Das Glücksrad"
            ],
            "x-parser-schema-id": "<anonymous-schema-4>"
          },
          "description": {
            "type": "string",
            "description": "This data can be used for notes/comments to better understand the purpose of the unit",
            "x-parser-schema-id": "<anonymous-schema-5>"
          },
          "userInterface": {
            "type": "object",
            "description": "Definition of visual presentation and interaction features.",
            "properties": {
              "player": {
                "type": "string",
                "description": "Verona player module to run the unit.",
                "examples": [
                  "iqb-player-speedtest@4.1",
                  "iqb-player-lottie@0.25"
                ],
                "x-parser-schema-id": "<anonymous-schema-7>"
              },
              "playerDependencies": {
                "type": "array",
                "items": {
                  "oneOf": [
                    {
                      "type": "string",
                      "description": "External verona widget module the unit will use.",
                      "minLength": 2,
                      "pattern": "^[A-Z_]+$",
                      "examples": [
                        "CALC",
                        "MOLECULE_EDITOR"
                      ],
                      "x-parser-schema-id": "<anonymous-schema-10>"
                    },
                    {
                      "type": "object",
                      "description": "External file this unit's (and possibly other units' as well) running or data processing depends on.",
                      "properties": {
                        "fileName": {
                          "type": "string",
                          "examples": [
                            "GeoGebra.itcr.zip"
                          ],
                          "x-parser-schema-id": "<anonymous-schema-12>"
                        },
                        "unpackBeforeProviding": {
                          "type": "boolean",
                          "description": "The file is to be an archive and must be unpacked to be delivered. The type of archive is detected via file extension - default: zip.",
                          "default": false,
                          "x-parser-schema-id": "<anonymous-schema-13>"
                        },
                        "httpResponseMode": {
                          "type": "string",
                          "description": "The mode of response leads to different parameter sets to enhance performance.",
                          "enum": [
                            "STANDARD",
                            "STREAM"
                          ],
                          "default": "STANDARD",
                          "x-parser-schema-id": "<anonymous-schema-14>"
                        }
                      },
                      "required": [
                        "fileName"
                      ],
                      "additionalProperties": false,
                      "x-parser-schema-id": "<anonymous-schema-11>"
                    }
                  ],
                  "x-parser-schema-id": "<anonymous-schema-9>"
                },
                "x-parser-schema-id": "<anonymous-schema-8>"
              },
              "editor": {
                "type": "string",
                "description": "Verona player module to edit the unit ui.",
                "examples": [
                  "iqb-editor-aspect@2.12"
                ],
                "x-parser-schema-id": "<anonymous-schema-15>"
              },
              "editorDependencies": {
                "type": "array",
                "items": {
                  "oneOf": [
                    "$ref:$.components.schemas.unit_index.properties.userInterface.properties.playerDependencies.items.oneOf[0]",
                    "$ref:$.components.schemas.unit_index.properties.userInterface.properties.playerDependencies.items.oneOf[1]"
                  ],
                  "x-parser-schema-id": "<anonymous-schema-17>"
                },
                "x-parser-schema-id": "<anonymous-schema-16>"
              },
              "type": {
                "type": "string",
                "description": "Used to specify the data type of the UI.",
                "examples": [
                  "iqb-aspect@5.0"
                ],
                "x-parser-schema-id": "<anonymous-schema-18>"
              },
              "definition": {
                "type": "string",
                "description": "Key to find the user interface definition (i.e. filename) or full stringified UI definition - depending on 'isDefinitionInline'.",
                "examples": [
                  "H7876d4.voud.json",
                  "<p>Bitte warte auf die Freigabe durch die Testleitung!</p>"
                ],
                "x-parser-schema-id": "<anonymous-schema-19>"
              },
              "isDefinitionInline": {
                "type": "boolean",
                "description": "If true the property 'definition' contains the full stringified UI definition.",
                "default": false,
                "x-parser-schema-id": "<anonymous-schema-20>"
              },
              "modifiedAt": {
                "type": "string",
                "format": "date-time",
                "description": "Timestamp of last change.",
                "examples": [
                  "2026-04-09T13:15:10.977Z"
                ],
                "x-parser-schema-id": "<anonymous-schema-21>"
              }
            },
            "required": [
              "player"
            ],
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-6>"
          },
          "codingScheme": {
            "type": "object",
            "description": "External file as part of the unit data.",
            "properties": {
              "id": {
                "type": "string",
                "description": "Key to find the data block. Usually this is the full filename without path.",
                "examples": [
                  "M2246.voxy.json"
                ],
                "x-parser-schema-id": "<anonymous-schema-23>"
              },
              "type": {
                "type": "string",
                "description": "Used to specify the data type of the block. Best pracise use <id>@<version> (see example)",
                "examples": [
                  "isb-unit-ex@3.6"
                ],
                "x-parser-schema-id": "<anonymous-schema-24>"
              },
              "modifiedAt": {
                "type": "string",
                "format": "date-time",
                "description": "Timestamp of last change. This is independent from the DateTime of the file in the file system.",
                "examples": [
                  "2026-04-09T13:15:10.977Z"
                ],
                "x-parser-schema-id": "<anonymous-schema-25>"
              },
              "dependencies": {
                "type": "array",
                "items": {
                  "oneOf": [
                    "$ref:$.components.schemas.unit_index.properties.userInterface.properties.playerDependencies.items.oneOf[0]",
                    "$ref:$.components.schemas.unit_index.properties.userInterface.properties.playerDependencies.items.oneOf[1]"
                  ],
                  "x-parser-schema-id": "<anonymous-schema-27>"
                },
                "x-parser-schema-id": "<anonymous-schema-26>"
              }
            },
            "required": [
              "id"
            ],
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-22>"
          },
          "comments": "$ref:$.components.schemas.unit_index.properties.codingScheme",
          "richNotes": "$ref:$.components.schemas.unit_index.properties.codingScheme",
          "metadata": "$ref:$.components.schemas.unit_index.properties.codingScheme",
          "items": "$ref:$.components.schemas.unit_index.properties.codingScheme",
          "variables": "$ref:$.components.schemas.unit_index.properties.codingScheme"
        },
        "required": [
          "id",
          "userInterface"
        ],
        "additionalProperties": false,
        "definitions": {
          "externalDataBlock": "$ref:$.components.schemas.unit_index.properties.codingScheme",
          "externalDependencyFile": "$ref:$.components.schemas.unit_index.properties.userInterface.properties.playerDependencies.items.oneOf[1]",
          "externalDependencyWidget": "$ref:$.components.schemas.unit_index.properties.userInterface.properties.playerDependencies.items.oneOf[0]"
        },
        "x-parser-schema-id": "unit-index@18.1"
      }
    }
  },
  "x-parser-spec-parsed": true,
  "x-parser-api-version": 3,
  "x-parser-spec-stringified": true
};
    const config = {"show":{"sidebar":false},"sidebar":{"showOperations":"byDefault"},"showOperations":false};
    const appRoot = document.getElementById('root');
    AsyncApiStandalone.render(
        { schema, config, }, appRoot
    );
  