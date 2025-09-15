import React, { useRef } from "react";
import Editor, { type Monaco } from "@monaco-editor/react";
import type { editor as MonacoEditor } from "monaco-editor";
import { sqlKeywords } from "../constants/sqlKeywords";
import { sqlSchema } from "../constants/sqlSchema";

const SqlEditor: React.FC = () => {
  const editorRef = useRef<MonacoEditor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount = (
    editor: MonacoEditor.IStandaloneCodeEditor,
    monaco: Monaco
  ) => {
    editorRef.current = editor;

    // Define a simple schema for intellisense
    monaco.languages.register({ id: "sql" });
    monaco.languages.setMonarchTokensProvider("sql", {
      keywords: sqlKeywords,
      tokenizer: {
        root: [
          [
            /[A-Za-z][A-Za-z0-9_]*/,
            {
              cases: {
                "@keywords": "keyword",
                "@default": "identifier",
              },
            },
          ],
          [/"[^"]*"/, "string"],
          [/'[^']*'/, "string"],
          [/\d+/, "number"],
          [/[;,.]/, "delimiter"],
          [/--.*$/, "comment"],
          [/\/\*/, "comment", "@comment"],
        ],
        comment: [
          [/[^/*]+/, "comment"],
          [/\*\//, "comment", "@pop"],
          [/[/*]/, "comment"],
        ],
      },
    });

    monaco.languages.registerCompletionItemProvider("sql", {
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };

        const suggestions = [];

        // Add tables and columns from schema
        for (const [tableName, columns] of Object.entries(sqlSchema)) {
          suggestions.push({
            label: tableName,
            kind: monaco.languages.CompletionItemKind.Class,
            detail: "Table",
            insertText: tableName,
            range,
          });
          for (const [colName, colType] of Object.entries(columns)) {
            suggestions.push({
              label: colName,
              kind: monaco.languages.CompletionItemKind.Field,
              detail: `Column (${colType})`,
              insertText: colName,
              range,
            });
          }
        }

        // Add SQL keywords
        for (const keyword of sqlKeywords) {
          suggestions.push({
            label: keyword,
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: keyword + " ",
            range,
          });
        }

        return { suggestions };
      },
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>SQL Editor</h1>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          marginTop: "20px",
        }}
      >
        <Editor
          height="400px"
          defaultLanguage="sql"
          defaultValue="-- Try typing a SQL query here
-- Example: SELECT * FROM users
"
          theme="vs-dark"
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            lineNumbers: "on",
            folding: true,
            fontSize: 14,
            suggestOnTriggerCharacters: true,
            suggest: {
              showKeywords: true,
              showSnippets: true,
            },
          }}
        />
      </div>
    </div>
  );
};

export default SqlEditor;
