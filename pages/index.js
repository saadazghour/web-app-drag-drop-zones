import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { data, statuses } from "../pages/data/index";
import { useState } from "react";
import TaskCard from "@/components/taskCard";
import Tasks from "@/components/Tasks";

export default function Home() {
  return (
    <div className="row">
      <Tasks />
    </div>
  );
}
