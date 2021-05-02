import * as React from "react";
import Calculator from "../components/calculator";
import { Provider } from "react-redux";
import CalculatorStore from "../store/store";
import Head from 'next/head';

export default function Home() {
  return (
    <Provider store={CalculatorStore}>
      <Head>
        <title>React + Redux Calculator</title>
        <meta name="description" content="A (buggy) calculator in style of Next.js + React + Redux" />
      </Head>
      <div className="bg-black h-screen overflow-auto sm:bg-gradient-to-tr from-purple-500 to-pink-400 flex">
        <Calculator />
      </div>
    </Provider>
  );
}
