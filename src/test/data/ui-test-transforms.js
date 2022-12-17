

/**
 * Story: adds list item to list
 * [list:PlanItem_0nndxko_di] --> [table:PlanItem_0th8d5v_di]
 */

export const simple_stories_transforms = {
  "pass-through": "function (data) { return data; }"
}

export const simple_stories_cmmn = {
  "cmmn_story_adds-list-item-to-list": {
    "PlanItem_0nndxko_di": {
      id: "PlanItem_0nndxko_di",
      type: "component",
      refs: ["list_component_identifier"]
    },
    "PlanItem_0th8d5v_di": {
      id: "PlanItem_0th8d5v_di",
      type: "component",
      refs: ["table_component_identifier"]
    },
    "PlanItemOnPart_125ga5x_di": {
      event_component: "PlanItem_0nndxko_di",
      event_listens: "select",
      id: "PlanItemOnPart_125ga5x_di",
      type: "transform",
      refs: ["pass-through"],
      trigger_component: "PlanItem_0th8d5v_di",
      trigger_action: "upsert"
    },
    id: "cmmn_story_adds-list-item-to-list"
  }
}

export const simple_stories_diagram = {
  "PlanItem_0nndxko_di": { ref: "PlanItem_0nndxko" },
  "PlanItem_0nndxko": { ref: "Task_14nbr0o" },
  "Task_14nbr0o": { type: "task", label: "Task item" },
  "PlanItem_0th8d5v_di": { ref: "PlanItem_0th8d5v" },
  "PlanItem_0th8d5v": {
    parent: "Sentry_18pc5du",
    ref: "EventListener_0poum21"
  },
  "EventListener_0poum21": { type: "EventListener", label: "Page load" },
  "PlanItemOnPart_125ga5x_di": { ref: "PlanItemOnPart_125ga5x" },
  "PlanItemOnPart_125ga5x": {
    ref: "PlanItem_0th8d5v",
    type: "planItemOnPart"
  }
}

export const simple_story_addslistitemtolist = {
  'component': { 'id': 'list_component_identifier', 'event': 'select' },
  'trigger': { 'id': 'table_component_identifier', 'action': 'upsert' },
  'transform': simple_stories_transforms["pass-through"]
}

export const simple_stories_xml = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>
<cmmn:definitions xmlns:dc=\"http://www.omg.org/spec/CMMN/20151109/DC\" xmlns:cmmndi=\"http://www.omg.org/spec/CMMN/20151109/CMMNDI\" xmlns:cmmn=\"http://www.omg.org/spec/CMMN/20151109/MODEL\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:di=\"http://www.omg.org/spec/CMMN/20151109/DI\" id=\"Definitions_0q2hekz\" targetNamespace=\"http://bpmn.io/schema/cmmn\" exporter=\"cmmn-js (https://demo.bpmn.io/cmmn)\" exporterVersion=\"0.20.0\">
    <cmmn:case id=\"Case_0mbeegm\">
        <cmmn:casePlanModel id=\"CasePlanModel_0l75tfv\" name=\"A CasePlanModel\">
            <cmmn:planItem id=\"PlanItem_0nndxko\" definitionRef=\"Task_14nbr0o\">
                <cmmn:entryCriterion id=\"EntryCriterion_0i4ja07\" sentryRef=\"Sentry_18pc5du\" />
            </cmmn:planItem>
            <cmmn:planItem id=\"PlanItem_0th8d5v\" definitionRef=\"EventListener_0poum21\" />
            <cmmn:sentry id=\"Sentry_18pc5du\">
                <cmmn:planItemOnPart id=\"PlanItemOnPart_125ga5x\" sourceRef=\"PlanItem_0th8d5v\">
                    <cmmn:standardEvent>occur</cmmn:standardEvent>
                </cmmn:planItemOnPart>
            </cmmn:sentry>
            <cmmn:task id=\"Task_14nbr0o\" name=\"Task item\" />
            <cmmn:eventListener id=\"EventListener_0poum21\" name=\"Page load\" />
        </cmmn:casePlanModel>
    </cmmn:case>
    <cmmndi:CMMNDI>
        <cmmndi:CMMNDiagram id=\"CMMNDiagram_1\">
            <cmmndi:Size width=\"500\" height=\"500\" />
            <cmmndi:CMMNShape id=\"DI_CasePlanModel_0l75tfv\" cmmnElementRef=\"CasePlanModel_0l75tfv\">
                <dc:Bounds x=\"156\" y=\"99\" width=\"534\" height=\"389\" />
                <cmmndi:CMMNLabel />
            </cmmndi:CMMNShape>
            <cmmndi:CMMNShape id=\"PlanItem_0nndxko_di\" cmmnElementRef=\"PlanItem_0nndxko\">
                <dc:Bounds x=\"512\" y=\"268\" width=\"100\" height=\"80\" />
                <cmmndi:CMMNLabel />
            </cmmndi:CMMNShape>
            <cmmndi:CMMNShape id=\"PlanItem_0th8d5v_di\" cmmnElementRef=\"PlanItem_0th8d5v\">
                <dc:Bounds x=\"244\" y=\"250\" width=\"36\" height=\"36\" />
                <cmmndi:CMMNLabel>
                    <dc:Bounds x=\"236\" y=\"286\" width=\"51\" height=\"13\" />
                </cmmndi:CMMNLabel>
            </cmmndi:CMMNShape>
            <cmmndi:CMMNShape id=\"EntryCriterion_0i4ja07_di\" cmmnElementRef=\"EntryCriterion_0i4ja07\">
                <dc:Bounds x=\"502\" y=\"294\" width=\"20\" height=\"28\" />
                <cmmndi:CMMNLabel />
            </cmmndi:CMMNShape>
            <cmmndi:CMMNEdge id=\"PlanItemOnPart_125ga5x_di\" cmmnElementRef=\"PlanItemOnPart_125ga5x\" targetCMMNElementRef=\"EntryCriterion_0i4ja07\" isStandardEventVisible=\"true\">
                <di:waypoint x=\"280\" y=\"268\" />
                <di:waypoint x=\"391\" y=\"268\" />
                <di:waypoint x=\"391\" y=\"308\" />
                <di:waypoint x=\"502\" y=\"308\" />
                <cmmndi:CMMNLabel>
                    <dc:Bounds x=\"379\" y=\"276\" width=\"35\" height=\"13\" />
                </cmmndi:CMMNLabel>
            </cmmndi:CMMNEdge>
        </cmmndi:CMMNDiagram>
    </cmmndi:CMMNDI>
</cmmn:definitions>
`

export const simple_stories_json = {
  "json": {
    "?xml": {
      "@_version": "1.0",
      "@_encoding": "UTF-8"
    },
    "cmmn:definitions": {
      "cmmn:case": {
        "cmmn:casePlanModel": {
          "cmmn:planItem": [
            {
              "cmmn:entryCriterion": {
                "@_id": "EntryCriterion_0i4ja07",
                "@_sentryRef": "Sentry_18pc5du"
              },
              "@_id": "PlanItem_0nndxko",
              "@_definitionRef": "Task_14nbr0o"
            },
            {
              "@_id": "PlanItem_0th8d5v",
              "@_definitionRef": "EventListener_0poum21"
            }
          ],
          "cmmn:sentry": {
            "cmmn:planItemOnPart": {
              "cmmn:standardEvent": "occur",
              "@_id": "PlanItemOnPart_125ga5x",
              "@_sourceRef": "PlanItem_0th8d5v"
            },
            "@_id": "Sentry_18pc5du"
          },
          "cmmn:task": {
            "@_id": "Task_14nbr0o",
            "@_name": "Task item"
          },
          "cmmn:eventListener": {
            "@_id": "EventListener_0poum21",
            "@_name": "Page load"
          },
          "@_id": "CasePlanModel_0l75tfv",
          "@_name": "A CasePlanModel"
        },
        "@_id": "Case_0mbeegm"
      },
      "cmmndi:CMMNDI": {
        "cmmndi:CMMNDiagram": {
          "cmmndi:Size": {
            "@_width": "500",
            "@_height": "500"
          },
          "cmmndi:CMMNShape": [
            {
              "dc:Bounds": {
                "@_x": "156",
                "@_y": "99",
                "@_width": "534",
                "@_height": "389"
              },
              "cmmndi:CMMNLabel": "",
              "@_id": "DI_CasePlanModel_0l75tfv",
              "@_cmmnElementRef": "CasePlanModel_0l75tfv"
            },
            {
              "dc:Bounds": {
                "@_x": "512",
                "@_y": "268",
                "@_width": "100",
                "@_height": "80"
              },
              "cmmndi:CMMNLabel": "",
              "@_id": "PlanItem_0nndxko_di",
              "@_cmmnElementRef": "PlanItem_0nndxko"
            },
            {
              "dc:Bounds": {
                "@_x": "244",
                "@_y": "250",
                "@_width": "36",
                "@_height": "36"
              },
              "cmmndi:CMMNLabel": {
                "dc:Bounds": { "@_x": "236", "@_y": "286", "@_width": "51", "@_height": "13" }
              },
              "@_id": "PlanItem_0th8d5v_di",
              "@_cmmnElementRef": "PlanItem_0th8d5v"
            },
            {
              "dc:Bounds": { "@_x": "502", "@_y": "294", "@_width": "20", "@_height": "28" },
              "cmmndi:CMMNLabel": "",
              "@_id": "EntryCriterion_0i4ja07_di",
              "@_cmmnElementRef": "EntryCriterion_0i4ja07"
            }
          ],
          "cmmndi:CMMNEdge": {
            "di:waypoint": [
              {
                "@_x": "280",
                "@_y": "268"
              },
              {
                "@_x": "391",
                "@_y": "268"
              },
              {
                "@_x": "391",
                "@_y": "308"
              },
              {
                "@_x": "502",
                "@_y": "308"
              }
            ],
            "cmmndi:CMMNLabel": {
              "dc:Bounds": {
                "@_x": "379",
                "@_y": "276",
                "@_width": "35",
                "@_height": "13"
              }
            },
            "@_id": "PlanItemOnPart_125ga5x_di",
            "@_cmmnElementRef": "PlanItemOnPart_125ga5x",
            "@_targetCMMNElementRef": "EntryCriterion_0i4ja07",
            "@_isStandardEventVisible": "true"
          },
          "@_id": "CMMNDiagram_1"
        }
      },
      "@_xmlns:dc": "http://www.omg.org/spec/CMMN/20151109/DC",
      "@_xmlns:cmmndi": "http://www.omg.org/spec/CMMN/20151109/CMMNDI",
      "@_xmlns:cmmn": "http://www.omg.org/spec/CMMN/20151109/MODEL",
      "@_xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
      "@_xmlns:di": "http://www.omg.org/spec/CMMN/20151109/DI",
      "@_id": "Definitions_0q2hekz",
      "@_targetNamespace": "http://bpmn.io/schema/cmmn",
      "@_exporter": "cmmn-js (https://demo.bpmn.io/cmmn)",
      "@_exporterVersion": "0.20.0"
    }
  }
}


export const cmmn_stories_json = {
  "json": {
    "?xml": {
      "@_version": "1.0",
      "@_encoding": "UTF-8"
    },
    "cmmn:definitions": {
      "cmmn:case": {
        "cmmn:casePlanModel": {
          "cmmn:planItem": [
            {
              "cmmn:entryCriterion": [
                {
                  "@_id": "EntryCriterion_0i4ja07",
                  "@_sentryRef": "Sentry_18pc5du"
                },
                {
                  "@_id": "EntryCriterion_1hedydg",
                  "@_sentryRef": "Sentry_1o894ct"
                }
              ],
              "@_id": "PlanItem_0nndxko",
              "@_definitionRef": "Task_14nbr0o"
            },
            {
              "@_id": "PlanItem_0th8d5v",
              "@_definitionRef": "EventListener_0poum21"
            },
            {
              "cmmn:entryCriterion": [
                {
                  "@_id": "EntryCriterion_1vtdxp9",
                  "@_sentryRef": "Sentry_1eamzu4"
                },
                {
                  "@_id": "EntryCriterion_0ulsilg",
                  "@_sentryRef": "Sentry_0507oud"
                }
              ],
              "@_id": "PlanItem_1ulcvc5",
              "@_definitionRef": "Task_0kjifjq"
            },
            {
              "@_id": "PlanItem_04ccxml",
              "@_definitionRef": "EventListener_1qr3hl5"
            }
          ],
          "cmmn:sentry": [
            {
              "cmmn:planItemOnPart": {
                "cmmn:standardEvent": "occur",
                "@_id": "PlanItemOnPart_125ga5x",
                "@_sourceRef": "PlanItem_0th8d5v"
              },
              "@_id": "Sentry_18pc5du"
            },
            {
              "cmmn:planItemOnPart": {
                "cmmn:standardEvent": "occur",
                "@_id": "PlanItemOnPart_05n9stv",
                "@_sourceRef": "PlanItem_0th8d5v"
              },
              "@_id": "Sentry_1eamzu4"
            },
            {
              "cmmn:planItemOnPart": {
                "cmmn:standardEvent": "complete",
                "@_id": "PlanItemOnPart_1vya8or",
                "@_sourceRef": "PlanItem_1ulcvc5"
              },
              "@_id": "Sentry_1o894ct"
            },
            {
              "cmmn:planItemOnPart": {
                "cmmn:standardEvent": "occur",
                "@_id": "PlanItemOnPart_0u2w80k",
                "@_sourceRef": "PlanItem_04ccxml"
              },
              "@_id": "Sentry_0507oud"
            }
          ],
          "cmmn:task": [
            {
              "@_id": "Task_14nbr0o",
              "@_name": "Show"
            },
            {
              "@_id": "Task_0kjifjq",
              "@_name": "Additional path"
            }
          ],
          "cmmn:eventListener": [
            {
              "@_id": "EventListener_0poum21",
              "@_name": "Page load"
            },
            {
              "@_id": "EventListener_1qr3hl5",
              "@_name": "Select"
            }
          ],
          "@_id": "CasePlanModel_0l75tfv",
          "@_name": "A CasePlanModel"
        },
        "@_id": "Case_0mbeegm"
      },
      "cmmndi:CMMNDI": {
        "cmmndi:CMMNDiagram": {
          "cmmndi:Size": {
            "@_width": "500",
            "@_height": "500"
          },
          "cmmndi:CMMNShape": [
            {
              "dc:Bounds": {
                "@_x": "156",
                "@_y": "40",
                "@_width": "534",
                "@_height": "448"
              },
              "cmmndi:CMMNLabel": "",
              "@_id": "DI_CasePlanModel_0l75tfv",
              "@_cmmnElementRef": "CasePlanModel_0l75tfv"
            },
            {
              "dc:Bounds": {
                "@_x": "509",
                "@_y": "236",
                "@_width": "100",
                "@_height": "80"
              },
              "cmmndi:CMMNLabel": "",
              "@_id": "PlanItem_0nndxko_di",
              "@_cmmnElementRef": "PlanItem_0nndxko"
            },
            {
              "dc:Bounds": {
                "@_x": "205",
                "@_y": "258",
                "@_width": "36",
                "@_height": "36"
              },
              "cmmndi:CMMNLabel": {
                "dc:Bounds": {
                  "@_x": "197",
                  "@_y": "294",
                  "@_width": "51",
                  "@_height": "13"
                }
              },
              "@_id": "PlanItem_0th8d5v_di",
              "@_cmmnElementRef": "PlanItem_0th8d5v"
            },
            {
              "dc:Bounds": {
                "@_x": "499",
                "@_y": "262",
                "@_width": "20",
                "@_height": "28"
              },
              "cmmndi:CMMNLabel": "",
              "@_id": "EntryCriterion_0i4ja07_di",
              "@_cmmnElementRef": "EntryCriterion_0i4ja07"
            },
            {
              "dc:Bounds": {
                "@_x": "347",
                "@_y": "134",
                "@_width": "100",
                "@_height": "80"
              },
              "cmmndi:CMMNLabel": "",
              "@_id": "PlanItem_1ulcvc5_di",
              "@_cmmnElementRef": "PlanItem_1ulcvc5"
            },
            {
              "dc:Bounds": {
                "@_x": "385",
                "@_y": "200",
                "@_width": "20",
                "@_height": "28"
              },
              "cmmndi:CMMNLabel": "",
              "@_id": "EntryCriterion_1vtdxp9_di",
              "@_cmmnElementRef": "EntryCriterion_1vtdxp9"
            },
            {
              "dc:Bounds": {
                "@_x": "549",
                "@_y": "222",
                "@_width": "20",
                "@_height": "28"
              },
              "cmmndi:CMMNLabel": "",
              "@_id": "EntryCriterion_1hedydg_di",
              "@_cmmnElementRef": "EntryCriterion_1hedydg"
            },
            {
              "dc:Bounds": {
                "@_x": "205",
                "@_y": "76",
                "@_width": "36",
                "@_height": "36"
              },
              "cmmndi:CMMNLabel": {
                "dc:Bounds": {
                  "@_x": "207",
                  "@_y": "112",
                  "@_width": "32",
                  "@_height": "12"
                }
              },
              "@_id": "PlanItem_04ccxml_di",
              "@_cmmnElementRef": "PlanItem_04ccxml"
            },
            {
              "dc:Bounds": {
                "@_x": "378",
                "@_y": "120",
                "@_width": "20",
                "@_height": "28"
              },
              "cmmndi:CMMNLabel": "",
              "@_id": "EntryCriterion_0ulsilg_di",
              "@_cmmnElementRef": "EntryCriterion_0ulsilg"
            }
          ],
          "cmmndi:CMMNEdge": [
            {
              "di:waypoint": [
                {
                  "@_x": "241",
                  "@_y": "276"
                },
                {
                  "@_x": "370",
                  "@_y": "276"
                },
                {
                  "@_x": "370",
                  "@_y": "276"
                },
                {
                  "@_x": "499",
                  "@_y": "276"
                }
              ],
              "cmmndi:CMMNLabel": {
                "dc:Bounds": {
                  "@_x": "276",
                  "@_y": "286",
                  "@_width": "35",
                  "@_height": "13"
                }
              },
              "@_id": "PlanItemOnPart_125ga5x_di",
              "@_cmmnElementRef": "PlanItemOnPart_125ga5x",
              "@_targetCMMNElementRef": "EntryCriterion_0i4ja07",
              "@_isStandardEventVisible": "true"
            },
            {
              "di:waypoint": [
                {
                  "@_x": "241",
                  "@_y": "276"
                },
                {
                  "@_x": "395",
                  "@_y": "276"
                },
                {
                  "@_x": "395",
                  "@_y": "228"
                }
              ],
              "cmmndi:CMMNLabel": {
                "dc:Bounds": {
                  "@_x": "352",
                  "@_y": "243",
                  "@_width": "35",
                  "@_height": "13"
                }
              },
              "@_id": "PlanItemOnPart_05n9stv_di",
              "@_cmmnElementRef": "PlanItemOnPart_05n9stv",
              "@_targetCMMNElementRef": "EntryCriterion_1vtdxp9",
              "@_isStandardEventVisible": "true"
            },
            {
              "di:waypoint": [
                {
                  "@_x": "447",
                  "@_y": "174"
                },
                {
                  "@_x": "559",
                  "@_y": "174"
                },
                {
                  "@_x": "559",
                  "@_y": "222"
                }
              ],
              "cmmndi:CMMNLabel": {
                "dc:Bounds": {
                  "@_x": "482",
                  "@_y": "153",
                  "@_width": "53",
                  "@_height": "13"
                }
              },
              "@_id": "PlanItemOnPart_1vya8or_di",
              "@_cmmnElementRef": "PlanItemOnPart_1vya8or",
              "@_targetCMMNElementRef": "EntryCriterion_1hedydg",
              "@_isStandardEventVisible": "true"
            },
            {
              "di:waypoint": [
                {
                  "@_x": "241",
                  "@_y": "94"
                },
                {
                  "@_x": "388",
                  "@_y": "94"
                },
                {
                  "@_x": "388",
                  "@_y": "120"
                }
              ],
              "cmmndi:CMMNLabel": {
                "dc:Bounds": {
                  "@_x": "294",
                  "@_y": "76",
                  "@_width": "35",
                  "@_height": "13"
                }
              },
              "@_id": "PlanItemOnPart_0u2w80k_di",
              "@_cmmnElementRef": "PlanItemOnPart_0u2w80k",
              "@_targetCMMNElementRef": "EntryCriterion_0ulsilg",
              "@_isStandardEventVisible": "true"
            }
          ],
          "@_id": "CMMNDiagram_1"
        }
      },
      "@_xmlns:dc": "http://www.omg.org/spec/CMMN/20151109/DC",
      "@_xmlns:cmmndi": "http://www.omg.org/spec/CMMN/20151109/CMMNDI",
      "@_xmlns:cmmn": "http://www.omg.org/spec/CMMN/20151109/MODEL",
      "@_xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
      "@_xmlns:di": "http://www.omg.org/spec/CMMN/20151109/DI",
      "@_id": "Definitions_0q2hekz",
      "@_targetNamespace": "http://bpmn.io/schema/cmmn",
      "@_exporter": "cmmn-js (https://demo.bpmn.io/cmmn)",
      "@_exporterVersion": "0.20.0"
    }
  }
}

export const cmmn_stories_component_links = {
  "9d9908d9304b6ea28d839efa168690d53eb810d3": {
    "id": "9d9908d9304b6ea28d839efa168690d53eb810d3",
    "link": {
      "PlanItemOnPart_125ga5x_di": {
        "trigger_action": null,
        "id": "PlanItemOnPart_125ga5x_di",
        "type": "component",
        "event_component": "PlanItem_0th8d5v",
        "event_listens": null,
        "refs": ["ff20434a9ebd5fdfbb878ba1510f2f1ac03e5e9c"],
        "trigger_component": "PlanItem_0nndxko"
      },
      "PlanItem_0nndxk0": {
        "id": "PlanItem_0nndxk0", "type": "component",
        "refs": ["c185bed7824965dd1239c3a16384270ae7518d30"]
      }
    }
  },
  "43979fe92efc66f229aaa37b16de37c70b429986": {
    "id": "43979fe92efc66f229aaa37b16de37c70b429986",
    "link": {
      "PlanItem_0nndxko": {
        "refs": ["2ecc29dafb3c789da9c304adba985d8b00ff2329"],
        "type": "component", "id": "PlanItem_0nndxko"
      },
      "PlanItem_0th8d5v": {
        "type": "component", "id": "PlanItem_0th8d5v",
        "refs": ["5115af4a330461990a07f1e871f039be9f68c1bc"]
      },
      "PlanItem_1ulcvc5": {
        "type": "component", "id": "PlanItem_1ulcvc5",
        "refs": ["c185bed7824965dd1239c3a16384270ae7518d30"]
      },
      "PlanItem_04ccxml": {
        "refs": ["c185bed7824965dd1239c3a16384270ae7518d30"],
        "id": "PlanItem_04ccxml", "type": "component"
      }
    }
  }
}


export const cmmn_stories_component_links_lookup = {
  "PlanItemOnPart_125ga5x_di": {
    "components": ["ff20434a9ebd5fdfbb878ba1510f2f1ac03e5e9c"],
    "story": "9d9908d9304b6ea28d839efa168690d53eb810d3"
  },
  "PlanItem_04ccxml": {
    "components": ["c185bed7824965dd1239c3a16384270ae7518d30"],
    "story": "43979fe92efc66f229aaa37b16de37c70b429986"
  },
  "PlanItem_0nndxk0": {
    "components": ["c185bed7824965dd1239c3a16384270ae7518d30"],
    "story": "9d9908d9304b6ea28d839efa168690d53eb810d3"
  },
  "PlanItem_0nndxko": {
    "components": ["2ecc29dafb3c789da9c304adba985d8b00ff2329"],
    "story": "43979fe92efc66f229aaa37b16de37c70b429986"
  },
  "PlanItem_0th8d5v": {
    "components": ["5115af4a330461990a07f1e871f039be9f68c1bc"],
    "story": "43979fe92efc66f229aaa37b16de37c70b429986"
  },
  "PlanItem_1ulcvc5": {
    "components": ["c185bed7824965dd1239c3a16384270ae7518d30"],
    "story": "43979fe92efc66f229aaa37b16de37c70b429986"
  }
}

export const cmmn_stories_edges = [
  {
    story: '43979fe92efc66f229aaa37b16de37c70b429986',
    component: { id: '5115af4a330461990a07f1e871f039be9f68c1bc' },
    label: "Page load > Show",
    transform_id: "PlanItemOnPart_125ga5x_di",
    trigger: { id: '2ecc29dafb3c789da9c304adba985d8b00ff2329' }
  },
  {
    story: '43979fe92efc66f229aaa37b16de37c70b429986',
    component: { id: '5115af4a330461990a07f1e871f039be9f68c1bc' },
    label: "Page load > Additional path",
    transform_id: "PlanItemOnPart_05n9stv_di",
    trigger: { id: 'c185bed7824965dd1239c3a16384270ae7518d30' }
  },
  {
    story: '43979fe92efc66f229aaa37b16de37c70b429986',
    component: { id: 'c185bed7824965dd1239c3a16384270ae7518d30' },
    label: "Additional path > Show",
    transform_id: "PlanItemOnPart_1vya8or_di",
    trigger: { id: '2ecc29dafb3c789da9c304adba985d8b00ff2329' }
  },
  {
    story: '43979fe92efc66f229aaa37b16de37c70b429986',
    component: { id: 'c185bed7824965dd1239c3a16384270ae7518d30' },
    label: "Select > Additional path",
    transform_id: "PlanItemOnPart_0u2w80k_di",
    trigger: { id: 'c185bed7824965dd1239c3a16384270ae7518d30' }
  }
]


export const eventfull_transforms = {
  "c185bed7824965dd1239c3a16384270ae7518d30-c185bed7824965dd1239c3a16384270ae7518d30=43979fe92efc66f229aaa37b16de37c70b429986": {
    "id": "c185bed7824965dd1239c3a16384270ae7518d30-c185bed7824965dd1239c3a16384270ae7518d30=43979fe92efc66f229aaa37b16de37c70b429986",
    "language": "javascript",
    "updated": "2022-03-01T20:53:47.889Z",
    "code": "return data;"
  },
  "5115af4a330461990a07f1e871f039be9f68c1bc-2ecc29dafb3c789da9c304adba985d8b00ff2329=43979fe92efc66f229aaa37b16de37c70b429986": {
    "updated": 1646167770884,
    "code": "return data;",
    "source": {
      "id": "deleted",
      "component": "5115af4a330461990a07f1e871f039be9f68c1bc",
      "story": "43979fe92efc66f229aaa37b16de37c70b429986"
    },
    "language": "javascript",
    "target": {
      "story": "43979fe92efc66f229aaa37b16de37c70b429986",
      "component": "2ecc29dafb3c789da9c304adba985d8b00ff2329",
      "id": "pop_front"
    },
    "id": "5115af4a330461990a07f1e871f039be9f68c1bc-2ecc29dafb3c789da9c304adba985d8b00ff2329=43979fe92efc66f229aaa37b16de37c70b429986"
  },
  "c185bed7824965dd1239c3a16384270ae7518d30-2ecc29dafb3c789da9c304adba985d8b00ff2329=43979fe92efc66f229aaa37b16de37c70b429986": {
    "updated": "2022-03-01T20:54:14.451Z",
    "language": "javascript",
    "id": "c185bed7824965dd1239c3a16384270ae7518d30-2ecc29dafb3c789da9c304adba985d8b00ff2329=43979fe92efc66f229aaa37b16de37c70b429986",
    "code": "return data;",
    "source": {
      "component": "c185bed7824965dd1239c3a16384270ae7518d30",
      "story": "43979fe92efc66f229aaa37b16de37c70b429986",
      "id": "deleted"
    },
    "target": {
      "component": "2ecc29dafb3c789da9c304adba985d8b00ff2329",
      "story": "43979fe92efc66f229aaa37b16de37c70b429986",
      "id": "clear"
    }
  },
  "5115af4a330461990a07f1e871f039be9f68c1bc-c185bed7824965dd1239c3a16384270ae7518d30=43979fe92efc66f229aaa37b16de37c70b429986": {
    "target": {
      "id": "replace"
    },
    "updated": 1646167708654,
    "source": {
      "id": "pushing"
    },
    "language": "javascript",
    "id": "5115af4a330461990a07f1e871f039be9f68c1bc-c185bed7824965dd1239c3a16384270ae7518d30=43979fe92efc66f229aaa37b16de37c70b429986",
    "code": "return data;",
  }
}