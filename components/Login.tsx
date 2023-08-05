import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const Login = () => {
  return (
    <div className="w-screen h-screen bg-gray-900 flex justify-center items-center">
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name of your project" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Phone number</Label>
                <Input id="name" placeholder="Enter your phone number" type="number" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button>Get Otp</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
