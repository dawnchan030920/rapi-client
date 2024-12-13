import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function CreateRestfulEndpointDialogContent({
  createRestfulEndpoint,
}: {
  createRestfulEndpoint: (
    name: string,
    httpMethod: string,
    description: string
  ) => void;
}) {
  const [name, setName] = useState("");
  const [httpMethod, setHttpMethod] = useState("");
  const [description, setDescription] = useState("");
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create RESTful Endpoint</DialogTitle>
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

        <div className="grid gap-2">
          <Label>HTTP Method</Label>
          <Select
            value={httpMethod}
            onValueChange={(value) => setHttpMethod(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an HTTP method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GET">GET</SelectItem>
              <SelectItem value="POST">POST</SelectItem>
              <SelectItem value="PUT">PUT</SelectItem>
              <SelectItem value="PATCH">PATCH</SelectItem>
              <SelectItem value="DELETE">DELETE</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <DialogFooter>
        <Button
          onClick={() => createRestfulEndpoint(name, httpMethod, description)}
        >
          Create
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
