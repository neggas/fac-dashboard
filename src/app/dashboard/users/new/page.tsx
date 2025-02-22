"use client";

import { saveNewUser } from "@/app/actions/users";
import PageHeader from "@/app/components/PageHeader";
import { createUserSchema } from "@/app/lib/form-validation";
import { Role, UserFormWithLabel } from "@/app/types";
import { ROUTES } from "@/config/constants";
import AutocompleteField from "@/config/themes/components/inputs/AutocompleteField";
import InputField from "@/config/themes/components/inputs/InputField";
import { Box, Button, Flex, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";

const initialValues = {
  name: "",
  email: "",
  role: { label: "", value: "" },
  password: "",
};

const AddUser = () => {
  const router = useRouter();
  const handleSubmit = async (values: UserFormWithLabel) => {
    try {
      const response = await saveNewUser({
        ...values,
        role: values.role.value as Role,
      });

      if (!response.success) {
        //TODO: throw error with toast
        return;
      }

      router.push(ROUTES.USERS_PAGE);
    } catch (error: unknown) {
      console.log(error);
    }
  };
  return (
    <Box w="full" h="full">
      <PageHeader title="Ajouter un utilisateur" />

      <Flex w="full" h="full" justify="center" align="center" mt="100px">
        <Formik<UserFormWithLabel>
          initialValues={initialValues}
          validationSchema={createUserSchema}
          onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <VStack
                w="420px"
                spaceY="4"
                border="1px solid #E4E4E7"
                p="4"
                rounded="sm">
                <InputField name="name" placeholder="Pseudo" />
                <InputField name="email" placeholder="Email" />
                <AutocompleteField
                  options={[
                    { label: "Admin", value: "admin" },
                    { label: "Drop", value: "drop" },
                  ]}
                  name="role"
                  placeholder="Sélectionner le role"
                />
                <InputField placeholder="Mot de passe" name="password" />

                <Flex w="full" justify="end" alignItems="center">
                  <Button
                    type="submit"
                    textStyle="md"
                    px="8px"
                    loading={isSubmitting}>
                    Ajouter
                  </Button>
                </Flex>
              </VStack>
            </Form>
          )}
        </Formik>
      </Flex>
    </Box>
  );
};

export default AddUser;
