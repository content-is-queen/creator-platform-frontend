import "./Conversations.css";

import MainNav from "@/components/MainNav";
import ConversationList from "@/components/ConversationList";

const MessageActivity = () => {
  const users = [1, 2, 3, 4];
  return (
    <section className="bg-queen-gray message h-screen">
      <MainNav />
      <div className="message_grid">
        <div className="message_grid_item">
          <ul>
            {users?.map((user) => (
              <ConversationList key={user} />
            ))}
          </ul>
        </div>

        <div className="grid_item">
          <div className="p-4 pt-8 flex items-center space-x-4 rtl:space-x-reverse hover:rounded-lg border-solid pb-2">
            <div className="flex-shrink-0">
              <img
                className="w-12 h-12 lg:w-20 lg:h-20 rounded-full"
                src="/images/keshe.jpg"
                alt="Neiage"
              />
            </div>
            <div className="flex-1 min-w-0 self-start">
              <p className="font-medium text-gray-900 truncate">
                Kaleshe Alleyne-Vassel
              </p>
              <p className="text-sm text-gray-500 truncate">Email marketing</p>
            </div>
          </div>
          <div className="second h-full">
            <div className="w-full px-5 flex flex-col justify-between conv">
              <div className="flex flex-col mt-5">
                <div className="flex justify-start mb-4">
                  <img
                    src="/images/keshe.jpg"
                    className="object-cover h-12 w-12 rounded-full"
                    alt=""
                  />
                  <div className="ml-2 py-3 px-4 bg-queen-white rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-queen-black">
                    Hey, excited about working with you. Is there anything else
                    I need to know?
                  </div>
                </div>
                <div className="flex justify-end mb-4">
                  <div>
                    <div className="mt-4 mr-2 py-3 px-4 bg-queen-gray rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-queen-black">
                      I don’t think so, but I will let you know if anything
                      changes
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 pt-4 mb-2 sm:mb-0">
              <div className="relative flex">
                <input
                  type="text"
                  placeholder="Write your message!"
                  className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 rounded-full py-3 border border-queen-gray"
                />
                <div className="absolute right-0 pr-4 items-center inset-y-0 hidden sm:flex">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6 text-gray-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6 text-gray-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full px-3 py-2 transition duration-500 ease-in-out text-white bg-queen-orange hover:bg-queen-blue focus:outline-none"
                  >
                    <span className="font-bold">Send</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-6 w-6 ml-2 transform rotate-90"
                    >
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessageActivity;
