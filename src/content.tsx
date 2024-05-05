import cssText from "data-text:~style.css"
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"

import { ReplyButton } from "~features/ReplyButton"

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

// export const getInlineAnchor: PlasmoGetInlineAnchor = async () => ({
//       element: document.querySelector(".msg-form__contenteditable"),
//       insertPosition: "afterend"
// })

// const PlasmoOverlay = () => {
//   return (
//     <div className="z-50 flex fixed top-32 right-8">
//       <CountButton />
//     </div>
//   )
// }

// export const getInlineAnchor: PlasmoGetInlineAnchor = async<Element>() => ({
//   element: document.querySelector(`.msg-form__placeholder`),
//   insertPosition: "afterend"
// })

export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.querySelector(`.msg-form__placeholder`)

// Use this to optimize unmount lookups
export const getShadowHostId = () => "plasmo-inline-example-unique-id"

const PlasmoOverlay = () => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 10,
        right: 50
      }}>
      <ReplyButton />
    </div>
  )
}

// export default PlasmoInline

export default PlasmoOverlay
