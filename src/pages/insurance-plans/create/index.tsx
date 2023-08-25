import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createInsurancePlan } from 'apiSdk/insurance-plans';
import { insurancePlanValidationSchema } from 'validationSchema/insurance-plans';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { InsurancePlanInterface } from 'interfaces/insurance-plan';

function InsurancePlanCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: InsurancePlanInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createInsurancePlan(values);
      resetForm();
      router.push('/insurance-plans');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<InsurancePlanInterface>({
    initialValues: {
      plan_name: '',
      coverage: 0,
      premium: 0,
      deductible: 0,
      out_of_pocket_maximum: 0,
      insurance_provider_id: (router.query.insurance_provider_id as string) ?? null,
    },
    validationSchema: insurancePlanValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Insurance Plans',
              link: '/insurance-plans',
            },
            {
              label: 'Create Insurance Plan',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Insurance Plan
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.plan_name}
            label={'Plan Name'}
            props={{
              name: 'plan_name',
              placeholder: 'Plan Name',
              value: formik.values?.plan_name,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Coverage"
            formControlProps={{
              id: 'coverage',
              isInvalid: !!formik.errors?.coverage,
            }}
            name="coverage"
            error={formik.errors?.coverage}
            value={formik.values?.coverage}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('coverage', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Premium"
            formControlProps={{
              id: 'premium',
              isInvalid: !!formik.errors?.premium,
            }}
            name="premium"
            error={formik.errors?.premium}
            value={formik.values?.premium}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('premium', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Deductible"
            formControlProps={{
              id: 'deductible',
              isInvalid: !!formik.errors?.deductible,
            }}
            name="deductible"
            error={formik.errors?.deductible}
            value={formik.values?.deductible}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('deductible', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Out Of Pocket Maximum"
            formControlProps={{
              id: 'out_of_pocket_maximum',
              isInvalid: !!formik.errors?.out_of_pocket_maximum,
            }}
            name="out_of_pocket_maximum"
            error={formik.errors?.out_of_pocket_maximum}
            value={formik.values?.out_of_pocket_maximum}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('out_of_pocket_maximum', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'insurance_provider_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/insurance-plans')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'insurance_plan',
    operation: AccessOperationEnum.CREATE,
  }),
)(InsurancePlanCreatePage);
