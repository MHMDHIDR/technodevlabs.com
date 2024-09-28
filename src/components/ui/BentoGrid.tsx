"use client";
import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import {
  IconCode,
  IconCloudUpload,
  IconDeviceMobile,
  IconDatabase,
  IconChartBar,
  IconShieldLock,
  IconLayersLinked
} from "@tabler/icons-react";

export function BentoGridDemo() {
  return (
    <BentoGrid className='max-w-4xl mx-auto gap-4'>
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}

const items = [
  {
    title: "Custom Software Development",
    description:
      "Tailored software solutions to meet your unique business needs.",
    header: (
      <img
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGxyO6XoueF9rlSAVCScjON6jOqRxX6INs-g&s'
        alt='Custom Software Development'
        className='w-full h-full object-cover rounded-x1'
      />
    ),
    icon: <IconCode className='h-4 w-4 text-neutral-500' />
  },
  {
    title: "Cloud Solutions",
    description:
      "Leverage the power of the cloud to scale and optimize your business.",
    header: (
      <img
        src='https://www.kellerschroeder.com/wp-content/uploads/2023/08/Cloud-Solutions-2-Evansville-Nashville.png'
        alt='Cloud Solutions'
        className='w-full h-full object-cover rounded-xl'
      />
    ),
    icon: <IconCloudUpload className='h-4 w-4 text-neutral-500' />
  },
  {
    title: "Mobile App Development",
    description:
      "iOS and Android apps designed to enhance user experience and functionality.",
    header: (
      <img
        src='https://www.techmango.net/wp-content/uploads/2022/04/mobile-app-development.png'
        alt='Mobile App Development'
        className='w-full h-full object-cover rounded-xl'
      />
    ),
    icon: <IconDeviceMobile className='h-4 w-4 text-neutral-500' />
  },
  {
    title: "Data Analytics & BI",
    description:
      "Transform data into actionable insights to drive your business forward.",
    header: (
      <img
        src='/images/data-analytics.jpg'
        alt='Data Analytics & BI'
        className='w-full h-full object-cover rounded-xl'
      />
    ),
    icon: <IconChartBar className='h-4 w-4 text-neutral-500' />
  },
  {
    title: "Database Management",
    description:
      "Efficient and secure database solutions for high-performance applications.",
    header: (
      <img
        src='/images/database-management.jpg'
        alt='Database Management'
        className='w-full h-full object-cover rounded-xl'
      />
    ),
    icon: <IconDatabase className='h-4 w-4 text-neutral-500' />
  },
  {
    title: "Cybersecurity Services",
    description:
      "Protect your digital assets with cutting-edge security solutions.",
    header: (
      <img
        src='/images/cybersecurity.jpg'
        alt='Cybersecurity Services'
        className='w-full h-full object-cover rounded-xl'
      />
    ),
    icon: <IconShieldLock className='h-4 w-4 text-neutral-500' />
  },
  {
    title: "API & Integration Services",
    description:
      "Seamlessly connect different platforms with robust API solutions.",
    header: (
      <img
        src='/images/api-integration.jpg'
        alt='API & Integration Services'
        className='w-full h-full object-cover rounded-xl'
      />
    ),
    icon: <IconLayersLinked className='h-4 w-4 text-neutral-500' />
  }
];
