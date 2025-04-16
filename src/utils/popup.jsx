"use client";

import { useState, useContext, useEffect } from "react";
import KeyContext from "../context/KeyContext";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { isValidKey } from "./utils";

export default function Popup() {
  const [open, setOpen] = useState(true);
  const [tempKey, setTempKey] = useState("");
  const { setKey } = useContext(KeyContext);
  const [popupText, setPopupText] = useState("Choose Your Key");
  const [keyPlaceholder, setKeyPlaceholder] = useState("Please Enter Your Key")

  useEffect(()=>{
    if(JSON.parse(localStorage.getItem('passArr')).length === 0){
      setPopupText("Choose Your Key")
    } else {
      setPopupText("Enter Your Key")
    }
  }, [])

  return (
    <Dialog open={open} onClose={()=>{if(tempKey === ""){setOpen(true)}}} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold text-gray-900"
                  >
                    {popupText}
                  </DialogTitle>
                  <div className="mt-3">
                    <input
                      type="text"
                      placeholder={keyPlaceholder}
                      className="outline rounded-2xl pl-3 h-[40px]"
                      onChange={(e) => {
                        setTempKey((e.target.value).trim());
                      }}
                      value={tempKey}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => {
                  const valid = isValidKey(tempKey);
                  
                  if (tempKey === "" || valid) {
                    setKeyPlaceholder("Wrong Key");
                    setTempKey("");
                    setOpen(true);
                  } else {
                    setKey(tempKey);
                    setKeyPlaceholder("Please Enter Your Key");
                    setOpen(false);
                  }
                }}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Save Key
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}