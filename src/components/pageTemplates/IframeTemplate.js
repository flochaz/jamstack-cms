import React, { useState, useEffect, useRef } from 'react'
import { css } from '@emotion/core'
import { BlogContext } from '../../context/mainContext'

import EditOptions from './EditOptions'

function Iframe({ content, updateContent, deleteComponent, index, context: { theme }}) {
  const [editable, updateIsEditable] = useState(true)
  const [html, updateHtml] = useState(content.url ? content.url : 'Insert iframe here')
  const iframeRef = useRef(null)

  useEffect(() => {
    updateAndSave()
    // eslint-disable-next-line
  }, [])

  function updateAndSave() {
    updateIsEditable(!editable)
    let url = iframeRef.current.innerHTML
    console.log(`url ${JSON.stringify(iframeRef.content)}`);
    updateHtml(url)
    const content = {
      iframeHtml: `<iframe width="800" height="600" src="${url}" frameborder="0" marginheight="0" marginwidth="0"></iframe>`,
      url: url
    }
    console.log(`content ${content}`);
    updateContent(content)
  }

  return (
    <div css={iframeTemplateStyle(editable)}>
      <pre css={[preStyle(theme), editable ? editingStyle() : null]}>
        <code
          contentEditable={editable}
          suppressContentEditableWarning
          ref={iframeRef}
          css={iframeStyle}
          dangerouslySetInnerHTML={{__html: html }}
        />
      </pre>
      <EditOptions
        editable={editable}
        updateIsEditable={updateAndSave}
        theme={theme}
        deleteComponent={() => deleteComponent(index)}
      />
    </div>
  )
}

const IframeWithContext = props => (
  <BlogContext.Consumer>
    {
      context => <Iframe {...props} context={context} />
    }
  </BlogContext.Consumer>
)

const iframeStyle = css`
  outline: none;
  border: none;
  font-size: 16px;
  line-height: 0px;
`

const preStyle = ({ iframeBackgroundColor }) => css`
  background-color: ${iframeBackgroundColor};
  padding: 20px;
  border: 1px solid transparent;
`

const iframeTemplateStyle = (iseditable) => css`
  margin: 40px 10px 20px;
  position: relative;
  cursor: ${iseditable ? 'default' : 'pointer'};
`

const editingStyle = () => css`
  border: 1px solid #ddd;
`

export default IframeWithContext