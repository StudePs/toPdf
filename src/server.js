const express = require("express");
const path = require("path");
const ejs = require("ejs");
const { altuHistory } = require("./client");
const { organizer } = require("./util");

const app = express();
/*
const history = [
    {
      "id": null,
      "time": "2022-10-04T11:52:27.831Z",
      "sender": "bot",
      "message": [
        {
          "default": {
            "text": "Olá! Eu sou a assistente virtual do *Bradesco CapTISS*.",
            "type": "text"
          }
        },
        {
          "default": {
            "text": "Para prosseguir com segurança, preciso validar algumas informações. ",
            "type": "text"
          }
        },
        {
          "default": {
            "text": "Por favor, digite o *número da sua matrícula*.",
            "type": "text"
          }
        },
        {
          "default": {
            "type": "text_input",
            "payload": {
              "mask": "custom",
              "cognitive": false,
              "maskFormat": "M000000",
              "maskOptions": {
                "placeholder": "M000000",
                "translation": {
                  "0": {
                    "pattern": "[0-9]",
                    "optional": false
                  },
                  "M": {
                    "pattern": "[A-Za-z]",
                    "optional": false
                  }
                }
              }
            }
          }
        }
      ],
      "assistant_id": 2
    },
    {
      "id": null,
      "time": "2022-10-04T11:54:04.060Z",
      "sender": "user",
      "message": "I417197",
      "assistant_id": 2
    },
    {
      "id": null,
      "time": "2022-10-04T11:54:04.142Z",
      "sender": "bot",
      "message": [
        {
          "default": {
            "text": "Qual a data do seu nascimento?",
            "type": "text"
          }
        },
        {
          "default": {
            "type": "date",
            "payload": {
              "cognitive": false,
              "allowInput": true
            }
          }
        }
      ],
      "assistant_id": 2
    },
    {
      "id": null,
      "time": "2022-10-04T11:54:09.322Z",
      "sender": "user",
      "message": "28/09/2000",
      "assistant_id": 2
    },
    {
      "id": null,
      "time": "2022-10-04T11:54:11.563Z",
      "sender": "bot",
      "message": [
        {
          "default": {
            "text": "Agradeço as informações 😃",
            "type": "text"
          }
        },
        {
          "default": {
            "type": "select",
            "payload": {
              "pick": "Sobre o que você gostaria de falar?",
              "options": [
                {
                  "title": "Acompanhar ticket",
                  "value": "Acompanhar ticket"
                },
                {
                  "title": "Liminar/ NIP/ Mídia",
                  "value": "Liminar/ NIP/ Mídia"
                },
                {
                  "title": "Reversões",
                  "value": "Reversões"
                },
                {
                  "title": "Crítica de faturamento (Fature)",
                  "value": "Crítica de faturamento (Fature)"
                },
                {
                  "title": "Crítica autorize",
                  "value": "Crítica autorize"
                },
                {
                  "title": "Críticas fisioterapia",
                  "value": "Críticas fisioterapia"
                },
                {
                  "title": "Dúvidas de demonstrativos TISS",
                  "value": "Dúvidas de demonstrativos TISS"
                },
                {
                  "title": "Dúvidas de tributação",
                  "value": "Dúvidas de tributação"
                },
                {
                  "title": "Dúvidas de conciliação de conta",
                  "value": "Dúvidas de conciliação de conta"
                },
                {
                  "title": "Recurso de glosa",
                  "value": "Recurso de glosa"
                },
                {
                  "title": "Posição de pagamento de contas em aberto",
                  "value": "Posição de pagamento de contas em aberto"
                },
                {
                  "title": "Outros assuntos",
                  "value": "Outros assuntos"
                }
              ],
              "cognitive": false
            }
          }
        }
      ],
      "assistant_id": 2
    },
    {
      "id": null,
      "time": "2022-10-04T11:56:02.388Z",
      "sender": "user",
      "message": {
        "text": "Outros assuntos"
      },
      "assistant_id": 2
    },
    {
      "id": null,
      "time": "2022-10-04T11:56:02.438Z",
      "sender": "bot",
      "message": [
        {
          "default": {
            "text": "Como eu posso te ajudar? <br><br>💡*Dica*: digite a sua dúvida com poucas palavras.",
            "type": "text"
          }
        },
        {
          "default": {
            "type": "text_input",
            "payload": {
              "cognitive": true
            }
          }
        }
      ],
      "assistant_id": 2
    },
    {
      "id": null,
      "time": "2022-10-04T11:56:17.075Z",
      "sender": "user",
      "message": "Dúvidas sobre glosa",
      "assistant_id": 2
    },
    {
      "id": 120,
      "time": "2022-10-04T11:56:17.771Z",
      "sender": "bot",
      "message": [
        {
          "default": {
            "text": "Para melhor te ajudar com o *Recurso de glosa*, descreva a sua dúvida.",
            "type": "text"
          }
        },
        {
          "default": {
            "type": "text_input",
            "payload": {
              "cognitive": false
            }
          }
        }
      ],
      "assistant_id": 2
    },
    {
      "id": null,
      "time": "2022-10-04T11:57:23.771Z",
      "sender": "user",
      "message": "Identificamos no Demonstrativo de Análise de Contas Médicas do protocolo 330089181957, senha 3KRA663, guia prestador 440634, guia operadora 13000000000040956959, a glosa de conta toda com o motivo 1713 - FATURAMENTO INVALIDO e 2809 - COBRANÇA DE PACOTE NÃO CORRELACIONADO AO RELATÓRIO ESPECÍFICO. Segue demonstrativo em anexo.  Gostaria de esclarecimentos sobre a mesma, visto que a conta foi auditada in loco, e não foi encontrado erro de faturamento. Hospital Felício Rocho Fundação Felice Rosso CNPJ: 17.214.1490001/76 Referenciado: 120111",
      "assistant_id": 2
    },
    {
      "id": null,
      "time": "2022-10-04T11:57:23.812Z",
      "sender": "bot",
      "message": [
        {
          "default": {
            "text": "Por favor, digite a *glosa TISS aplicada*.",
            "type": "text"
          }
        },
        {
          "default": {
            "type": "text_input",
            "payload": {
              "mask": "numeric",
              "cognitive": false
            }
          }
        }
      ],
      "assistant_id": 2
    },
    {
      "id": null,
      "time": "2022-10-04T11:57:39.594Z",
      "sender": "user",
      "message": "1713",
      "assistant_id": 2
    },
    {
      "id": null,
      "time": "2022-10-04T11:57:39.640Z",
      "sender": "bot",
      "message": [
        {
          "default": {
            "text": "Me informe a *data de glosa*.",
            "type": "text"
          }
        },
        {
          "default": {
            "type": "date",
            "payload": {
              "cognitive": false,
              "allowInput": true
            }
          }
        }
      ],
      "assistant_id": 2
    },
    {
      "id": null,
      "time": "2022-10-04T11:58:24.384Z",
      "sender": "user",
      "message": "10/04/2022",
      "assistant_id": 2
    },
    {
      "id": null,
      "time": "2022-10-04T11:58:24.419Z",
      "sender": "bot",
      "message": [
        {
          "default": {
            "type": "quick_replies",
            "payload": {
              "pick": "Escolha qual opção você possui.",
              "replies": [
                {
                  "title": "Número da guia operadora de SADT",
                  "value": "Número da guia operadora de SADT"
                },
                {
                  "title": "Senha de internação",
                  "value": "Senha de internação"
                }
              ],
              "cognitive": false
            }
          }
        }
      ],
      "assistant_id": 2
    },
    {
      "id": null,
      "time": "2022-10-04T11:58:31.772Z",
      "sender": "user",
      "message": "Senha de internação",
      "assistant_id": 2
    },
    {
      "id": null,
      "time": "2022-10-04T11:58:31.821Z",
      "sender": "bot",
      "message": [
        {
          "default": {
            "text": "Digite a *senha de internação*.",
            "type": "text"
          }
        },
        {
          "default": {
            "type": "text_input",
            "payload": {
              "mask": "custom",
              "cognitive": "false",
              "maskFormat": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
              "maskOptions": {
                "placeholder": "Digite somente letras e números",
                "translation": {
                  "X": {
                    "pattern": "[A-Za-z0-9]",
                    "optional": false
                  }
                }
              }
            }
          }
        }
      ],
      "assistant_id": 2
    },
    {
      "id": null,
      "time": "2022-10-04T11:58:40.075Z",
      "sender": "user",
      "message": "3KRA663",
      "assistant_id": 2
    },
    {
      "id": null,
      "time": "2022-10-04T11:58:40.103Z",
      "sender": "bot",
      "message": [
        {
          "default": {
            "text": "Qual o *número de protocolo de recurso*?",
            "type": "text"
          }
        },
        {
          "default": {
            "type": "text_input",
            "payload": {
              "mask": "numeric",
              "cognitive": false
            }
          }
        }
      ],
      "assistant_id": 2
    },
    {
      "id": null,
      "time": "2022-10-04T11:58:52.554Z",
      "sender": "user",
      "message": "330089181957",
      "assistant_id": 2
    },
    {
      "id": null,
      "time": "2022-10-04T11:58:53.029Z",
      "sender": "bot",
      "message": [
        {
          "default": {
            "type": "quick_replies",
            "payload": {
              "pick": "Você gostaria de anexar algum arquivo?",
              "replies": [
                {
                  "title": "Sim",
                  "value": "Sim"
                },
                {
                  "title": "Não",
                  "value": "Não"
                }
              ],
              "cognitive": false
            }
          }
        }
      ],
      "assistant_id": 2
    },
    {
      "id": null,
      "time": "2022-10-04T11:58:55.308Z",
      "sender": "user",
      "message": "Sim",
      "assistant_id": 2
    },
    {
      "id": null,
      "time": "2022-10-04T11:58:55.368Z",
      "sender": "bot",
      "message": [
        {
          "default": {
            "text": "Por favor, anexe o arquivo.",
            "type": "text"
          }
        },
        {
          "default": {
            "type": "file_upload",
            "payload": {
              "delay": 1650,
              "maxFileSize": "10M",
              "acceptFileTypes": "PNG|JPEG|PDF|XLSX|XML|CSV|XLS"
            },
            "cognitive": false
          }
        }
      ],
      "assistant_id": 2
    },
    {
      "id": null,
      "time": "2022-10-04T11:59:15.894Z",
      "sender": "user",
      "message": {
        "file": {
          "url": "https://prime.altubots.com/chats/bradescosaude/6886f1c97704cf385e81050f36669626/uploads/bf3828f2-750c-83dd-3459-f1e2d5c16200/20221004115912579_Demonstrativo_protocolo_330089181957.pdf",
          "name": "Demonstrativo protocolo 330089181957.pdf",
          "size": 308256,
          "type": "pdf",
          "source": "public",
          "contentType": "application/pdf"
        },
        "text": "https://prime.altubots.com/chats/bradescosaude/6886f1c97704cf385e81050f36669626/uploads/bf3828f2-750c-83dd-3459-f1e2d5c16200/20221004115912579_Demonstrativo_protocolo_330089181957.pdf"
      },
      "assistant_id": 2
    },
    {
      "id": null,
      "time": "2022-10-04T11:59:17.589Z",
      "sender": "bot",
      "message": [
        {
          "default": {
            "type": "quick_replies",
            "payload": {
              "pick": "Gostaria de anexar outro arquivo?",
              "replies": [
                {
                  "title": "Sim",
                  "value": "Sim"
                },
                {
                  "title": "Não",
                  "value": "Não"
                }
              ],
              "cognitive": false
            }
          }
        }
      ],
      "assistant_id": 2
    },
    {
      "id": null,
      "time": "2022-10-04T11:59:19.703Z",
      "sender": "user",
      "message": "Não",
      "assistant_id": 2
    },
    {
      "id": null,
      "time": "2022-10-04T11:59:19.809Z",
      "sender": "bot",
      "message": [
        {
          "default": {
            "text": "Agradeço pelas informações. O número do seu ticket é:<br><br><b>PS08-1664884732945322</b>",
            "type": "text"
          }
        },
        {
          "default": {
            "text": "A solicitação foi encaminhada para um de nossos analistas e, quando houver atualizações, mandaremos um e-mail. <br><br>❗*Importante*: Lembre-se de verificar a caixa de SPAM.<br><br>Você também pode acompanhar seu ticket pelo nosso chat. É só escolher a opção *\"Acompanhar ticket\"* no menu.",
            "type": "text"
          }
        },
        {
          "default": {
            "type": "quick_replies",
            "payload": {
              "pick": "O que você gostaria de fazer agora?",
              "replies": [
                {
                  "title": "Voltar para o Menu CapTISS",
                  "value": "Voltar para o Menu CapTISS"
                },
                {
                  "title": "Encerrar atendimento",
                  "value": "Encerrar atendimento"
                }
              ],
              "cognitive": false
            }
          }
        }
      ],
      "assistant_id": 2
    },
    {
      "id": null,
      "time": "2022-10-04T11:59:34.842Z",
      "sender": "user",
      "message": "Encerrar atendimento",
      "assistant_id": 2
    },
    {
      "id": null,
      "time": "2022-10-04T11:59:34.925Z",
      "sender": "bot",
      "message": [
        {
          "default": {
            "text": "Antes de finalizar, gostaria de saber o que achou do meu atendimento 😊",
            "type": "text"
          }
        },
        {
          "default": {
            "text": "Baseado na sua experiência, em uma escala de 0 a 10, quanto você *recomendaria o chat do Bradesco CapTISS*?",
            "type": "text"
          }
        },
        {
          "default": {
            "type": "text_input",
            "payload": {
              "mask": "numeric",
              "cognitive": false
            }
          }
        }
      ],
      "assistant_id": 2
    },
    {
      "id": null,
      "time": "2022-10-04T11:59:43.388Z",
      "sender": "user",
      "message": "10",
      "assistant_id": 2
    },
    {
      "id": null,
      "time": "2022-10-04T11:59:43.451Z",
      "sender": "bot",
      "message": [
        {
          "default": {
            "type": "quick_replies",
            "payload": {
              "pick": "Sua solicitação foi resolvida neste contato? ",
              "replies": [
                {
                  "title": "Sim",
                  "value": "Sim"
                },
                {
                  "title": "Não",
                  "value": "Não"
                }
              ],
              "cognitive": false
            }
          }
        }
      ],
      "assistant_id": 2
    },
    {
      "id": null,
      "time": "2022-10-04T11:59:48.280Z",
      "sender": "user",
      "message": "Sim",
      "assistant_id": 2
    },
    {
      "id": null,
      "time": "2022-10-04T11:59:48.330Z",
      "sender": "bot",
      "message": [
        {
          "default": {
            "type": "quick_replies",
            "payload": {
              "pick": "Gostaria de deixar seu *elogio*,  *reclamação* ou *sugestão*?",
              "replies": [
                {
                  "title": "Sim",
                  "value": "Sim"
                },
                {
                  "title": "Não",
                  "value": "Não"
                }
              ],
              "cognitive": false
            }
          }
        }
      ],
      "assistant_id": 2
    },
    {
      "id": null,
      "time": "2022-10-04T11:59:50.370Z",
      "sender": "user",
      "message": "Sim",
      "assistant_id": 2
    },
    {
      "id": null,
      "time": "2022-10-04T11:59:50.409Z",
      "sender": "bot",
      "message": [
        {
          "default": {
            "text": "Por favor, digite sua opinião.",
            "type": "text"
          }
        },
        {
          "default": {
            "type": "text_input",
            "payload": {
              "cognitive": false
            }
          }
        }
      ],
      "assistant_id": 2
    },
    {
      "id": null,
      "time": "2022-10-04T12:00:34.127Z",
      "sender": "user",
      "message": "Sugestão: Necessário opção no menu referente a dúvidas de glosas, pois ao selecionar outros assuntos e citar \"glosa\" o bot reconhece como Recurso de Glosa. Exemplo: PS08-1664884732945322",
      "assistant_id": 2
    },
    {
      "id": null,
      "time": "2022-10-04T12:00:34.198Z",
      "sender": "bot",
      "message": [
        {
          "default": {
            "text": "Agradeço o contato e, sempre que precisar, estou à disposição 😃",
            "type": "text"
          }
        }
      ],
      "assistant_id": 2
    }
  ]
*/

app.get('/', async (request, response) => {
    let param = {
        instance: {
            key: "3222ad7edc1fb03c8e7cebe4d36c4089",
            name: "bradescosaude"
        },
        idContact: 1666,
        idAssistant: 2
    };

    const history = await altuHistory(param.instance, param.idContact, param.idAssistant);
   
    const timeLineMsg = organizer(history);

    const filePath = path.join(__dirname, "viewr_pdf/print.ejs");

    ejs.renderFile(filePath, { timeLineMsg }, (error, html) => {
        if (error) {
            console.log(error.message)
            return response.send("Error reading file");
        }
        
        return response.send(html);
    })
})

app.listen(3000, () => console.log(`Server on http://localhost:3000`))