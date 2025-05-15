"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchCases, fetchNotes } from "./services";
import { addMessageToThread, createThread, getThreadMessages, runAssistant, runAssistantOnThread } from "./services/openai.service";
import { ChatMessages } from "./components";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Home() {
  const [pipeDriveData, setPipeDriveData] = useState([]);
  const [messages, setMessages] = useState([]);

  const fetchDataFromPipeDrive = async () => {
    try {
      const result = await fetchNotes();
      console.log({ result });
      setPipeDriveData(result.data);
    } catch (error) {
      console.error("Error fetching Pipedrive data:", error);
    }
  };

  const processData = async () => {
    // Creating a thread
    const newThread = await createThread();
    console.log({ newThread });

    if (!newThread?.id) {
      console.error("Failed to create a thread.");
      return; // Don't proceed if the thread creation failed
    }

    const tempData = pipeDriveData.slice(0, 5);

    console.log({ tempData });

    // Looping over the data and inserting the data into the thread
    for (let convo of tempData) {
      let content = `
      You are a helpful assistant that summarizes system notes into a user chat message format.

      For the following data, identify the key points regarding the content, the user involved, and any relevant organization. Then, format this information as if it were a message in a chat conversation.

      ${JSON.stringify(convo)}

      Format the output like a user chat message, including the name of the user and the summarized content.
      `;
      await addMessageToThread(newThread.id, content); // Make sure to `await` the message addition
      await delay(1000); // Add a delay of 1 second between each message (if needed)
    }

    // setMessages(response.data);

    // Running the assistant on the thread
    const run = await runAssistant(newThread.id); // Use the correct function to run the assistant
    console.log({ run });

    if (run?.id) {
      // Optionally, you might want to wait for the run to complete here
      // before fetching messages. You can poll the run status.

      // Fetching all messages from the thread (including the assistant's response)
      const response = await getThreadMessages(newThread.id);
      console.log({ messages: response.data });
      setMessages(response.data);
    } else {
      console.error("Failed to run the assistant on the thread.");
    }
  };

  // Process to implement

  // 1. Fetch the data
  // 2. Create OPENAI threads and insert data in it.
  // 3. Process the threads and generate the listing of chats

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <header className="fixed top-0 inset-x-0 justify-start items-center flex shadow-lg p-2">
          <div className="container flex gap-12 justify-start items-center">
            <Image src="/ms-logo.webp" alt="Ms Logo" width={120} height={38} priority />
            <h1 className="prose lg:prose-xl text-xl text-gray-700">Grapple: Senior Fullstack Dev test</h1>
          </div>
        </header>

        {/* Controls to fetch and process data here */}
        <section>
          <div className="flex justify-start items-center gap-4">
            <button className="px-4 py-2 bg-green-500" onClick={fetchDataFromPipeDrive}>
              Fetch Notes (Pipedrive)
            </button>
            <button className="px-4 py-2 bg-green-500" onClick={processData}>
              Process Data
            </button>
          </div>
        </section>

        {/* <section>
          <div className="container flex gap-4 justify-end items-center">
            <code className="bg-gray-200 rounded-lg p-4 min-h-40  min-w-96 w-full h-full flex justify-center items-center shadow-xl">
              {`
                {
                  good: "luck!"
                }
              `}
            </code>
          </div>
        </section> */}

        {/* Rendering the list of chat messages */}
        {messages.length > 0 && <ChatMessages messages={messages} />}
      </main>
    </div>
  );
}
