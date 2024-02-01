import Image from "next/image";
import Header from "../components/header"
import Main from "../components/main"

const style = {
  wrapper: `h-screen max-h-screen h-min-screen w-screen bg-[#2D242F] text-white select-none flex flex-col justify-between`,
}

export default function Home() {
  return (
    <main className={style.wrapper}>
      <Header />
      <Main />
      <h2>Transaction history</h2>
    </main>
  );
}