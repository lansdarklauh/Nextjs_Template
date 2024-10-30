'use client';

import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { useEffect, useState } from 'react';
import { DomEditor } from '@wangeditor/editor';

export default function EditorComponent({ defaultValue, onChange, editorParams = {}, toolbarParams = {} }) {
  const [editor, setEditor] = useState(null);

  const [html, setHtml] = useState(defaultValue || '');
  const toolbarConfig = { ...toolbarParams };
  const editorConfig = {
    ...editorParams
  };

  useEffect(() => {
    const toolbar = DomEditor.getToolbar(editor);
    if (toolbar) {
      const curToolbarConfig = toolbar.getConfig();
      console.log(curToolbarConfig.toolbarKeys);
    }
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  useEffect(() => {
    setHtml(defaultValue);
  }, [defaultValue]);

  return (
    <>
      <div style={{ border: '1px solid #ccc', zIndex: 100, width: '100%' }}>
        <Toolbar editor={editor} defaultConfig={toolbarConfig} mode='simple' style={{ borderBottom: '1px solid #ccc' }} />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(editor) => {
            setHtml(editor.getHtml());
            onChange && onChange(editor.getHtml());
          }}
          mode='simple'
          style={{ height: '500px', overflowY: 'hidden' }}
        />
      </div>
    </>
  );
}
