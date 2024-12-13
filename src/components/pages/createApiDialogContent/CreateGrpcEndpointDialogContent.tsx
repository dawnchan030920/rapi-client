import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function CreateGrpcEndpointDialogContent({
  createGrpcEndpoint,
}: {
  createGrpcEndpoint: (
    name: string,
    service: string,
    description: string,
    isParamStream: boolean,
    isResultStream: boolean
  ) => void;
}) {
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [description, setDescription] = useState("");
  const [paramStream, setParamStream] = useState(false);
  const [resultStream, setResultStream] = useState(false);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create gRPC Endpoint</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="service">Service</Label>
        <Input
          id="service"
          value={service}
          onChange={(e) => setService(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label>Description</Label>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="paramStream"
          checked={paramStream}
          onCheckedChange={(checked) => {
            setParamStream(checked === true);
          }}
        />
        <Label htmlFor="paramStream">Parameter Stream</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="resultStream"
          checked={resultStream}
          onCheckedChange={(checked) => {
            setResultStream(checked === true);
          }}
        />
        <Label htmlFor="resultStream">Result Stream</Label>
      </div>
      <DialogFooter>
        <Button
          onClick={() =>
            createGrpcEndpoint(
              name,
              service,
              description,
              paramStream,
              resultStream
            )
          }
        >
          Create
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
