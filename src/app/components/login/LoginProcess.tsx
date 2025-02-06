"use client";

import { Box, VStack } from "@chakra-ui/react";
import { Button } from "@/config/themes/chakra/button";
import { Form, Formik } from "formik";
import InputField from "@/config/themes/components/inputs/InputField";
import { LoginFormType } from "@/app/types";
import { loginSchema } from "@/app/lib/form-validation";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/app/lib/routes";
import { signIn } from "next-auth/react";

const loginInitialValue = {
  username: "",
  password: "",
};

export default function LoginProcess() {
  const router = useRouter();

  const handleLogin = async (values: LoginFormType) => {
    try {
      const response = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
        callbackUrl: "/auth/login",
      });

      if (response?.ok) {
        router.push(ROUTES.DASHBOARD);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik<LoginFormType>
      initialValues={loginInitialValue}
      onSubmit={(values) => handleLogin(values)}
      validationSchema={loginSchema}>
      {({ isSubmitting }) => (
        <Form>
          <VStack spaceY="4">
            <InputField placeholder="Username" name="username" color="white" />

            <InputField
              type="password"
              placeholder="Mot de passe "
              name="password"
              color="white"
            />
          </VStack>

          <Box w="full" mt="8">
            <Button
              w="full"
              bg="white"
              color="black"
              textTransform="uppercase"
              fontWeight="bold"
              fontSize="md"
              type="submit"
              loading={isSubmitting}>
              Login
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
