"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import EventForm from "./EventForm";

const CreateNewEvent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const routePath = usePathname();

  // console.log("router : ",router,"\n","search params : ",searchParams);
  useEffect(() => {
    const createEvent = searchParams.get("create");
    if (createEvent) {
      setIsOpen(true);
    }
  }, [searchParams]);

  const handleClose = () => {
    setIsOpen(false);
    if (searchParams.get("create")) {
      router.replace(routePath);
    }
  };
  return (
    <Suspense fallback={null}>
      <Drawer open={isOpen} onClose={handleClose}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Create New Event</DrawerTitle>
          </DrawerHeader>
          <EventForm
            onSubmitForm={() => {
              handleClose();
            }}
          />
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" onClose={handleClose}>
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Suspense>
  );
};

export default CreateNewEvent;
