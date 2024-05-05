import {
  ArrowDownIcon,
  PaperAirplaneIcon,
  RefreshIcon
} from "@heroicons/react/outline"
import magic from "data-base64:~/../assets/magic.png"
import { useReducer, useRef, useState } from "react"

export const ReplyButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isGenerated, setGeneration] = useState(false)
  const [reponse, setResponse] = useState(
    "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."
  )

  const inputRef = useRef(null)

  const openModal = () => {
    setGeneration(false);
    setInputValue("");
    setIsOpen(true)
  }

  const showGeneration = () => {
    setGeneration(true)
  }

  const hideGeneration = () => {
    setGeneration(false)
  }

  const [inputValue, setInputValue] = useState("")

  const handleCloseModal = () => setIsOpen(false)

  const insertIntoDom = () => {
    const targetDiv = document.querySelector(".msg-form__contenteditable") // replace 'targetDivId' with the id of your target div
    if (targetDiv) {
      // Remove all existing p tags

      const placeholder = document.querySelector(".msg-form__placeholder")
      if (placeholder) {
        placeholder.remove()
      }
      const pTags = targetDiv.querySelectorAll("p")
      pTags.forEach((pTag) => pTag.remove())
      // Inject new p tag
      const newPTag = document.createElement("p")
      newPTag.textContent = reponse
      targetDiv.appendChild(newPTag)
      document
        .querySelector(".msg-form__send-button")
        .removeAttribute("disabled")
    }
    handleCloseModal()
  }

  const handleGenerate = () => {
    // handleCloseModal()
    inputRef.current = inputValue
    showGeneration()
    setInputValue("")

    // console.log("Input value:", inputValue)
  }

  const UserMessage = ({ message }) => (
    <div className="flex justify-end mb-4">
      <div className="bg-gray-200 text-black rounded-lg px-4 py-2 w-auto inline-block max-w-md break-words">
        {message}
      </div>
    </div>
  )

  const AssistantMessage = ({ message }) => (
    <div className="flex justify-start mt-4">
      <div className="bg-blue-100 text-black rounded-lg px-4 py-2 w-auto inline-block max-w-md break-words">
        {message}
      </div>
    </div>
  )

  return (
    <div>
      <button
        onClick={openModal}
        className="w-16 h-16 rounded-full overflow-hidden focus:outline-none">
        <img
          src={magic}
          alt="Button Image"
          className="w-full h-full object-cover"
        />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-5/12 shadow-lg rounded-md bg-white">
            {isGenerated && (
              <>
                <UserMessage message={inputRef.current} />
                <AssistantMessage message={reponse} />
              </>
            )}
            <div className="mt-3 text-center">
              <div className="mt-2">
                <input
                  type="text"
                  className="px-4 py-2 border w-full rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Enter your message"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
              {isGenerated && (
                <div className="items-center py-3 flex justify-end">
                  <div className="flex space-x-4">
                    <button
                      className={`px-4 py-2 border rounded-md text-base font-medium w-48 shadow-sm focus:ring-2`}
                      onClick={insertIntoDom}>
                      <ArrowDownIcon className="w-5 h-5 inline-block mr-2 " />
                      Insert
                    </button>
                    <button
                      disabled={!inputValue}
                      onClick={handleGenerate}
                      className={`${!inputValue ? "opacity-50 cursor-not-allowed" : null}px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-48 shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}>
                      <RefreshIcon className="w-5 h-5 inline-block mr-2 " />
                      Regenerate
                    </button>
                  </div>
                </div>
              )}
              {!isGenerated && (
                <div className="items-center py-3 flex justify-end">
                  <button
                    onClick={handleGenerate}
                    disabled={!inputValue}
                    className={`${!inputValue ? "opacity-50 cursor-not-allowed" : null} px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-48 shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}>
                    <PaperAirplaneIcon className="w-5 h-5 inline-block mr-2 rotate-90" />
                    Generate
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
