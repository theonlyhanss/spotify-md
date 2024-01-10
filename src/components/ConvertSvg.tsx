import { CONVERT_SVG_CSS } from '@/style'
import React from 'react'

interface IConvertSVGParameters {
  children?: React.ReactNode
  height: string
  width: string
}

/**
 * Most important component here. Allows us to send components as images back to Github.
 * Everything we make will be inside.
 *
 * @param {string} height Height of the component.
 * @param {string} width Width of the component.
 * @returns {React.ReactNode} Functional React component.
 */
export default function ConvertSVG({
  children,
  height,
  width,
}: IConvertSVGParameters): React.ReactNode {
  return (
    <svg
      height={height}
      width={width}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <foreignObject width={width} height={height}>
        <div {...{ xmlns: 'http://www.w3.org/1999/xhtml' }}>
          <style>{CONVERT_SVG_CSS}</style>
          {children}
        </div>
      </foreignObject>
    </svg>
  )
}
