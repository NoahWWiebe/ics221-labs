import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(2, 'Name must be at least ${min} characters.')
    .max(30, 'Name must be no more than ${max} characters')
    .required('A name is required.'),
  msgText: yup
    .string()
    .trim()
    .min(2, 'Your message must be at least ${min} characters.')
    .max(30, 'Your message must be no more than ${max} characters')
    .required('A message is required.')
});

const NewMessageForm = ({ addNewMessage }) => {
  const handleFormData = (values, { resetForm, setSubmitting }) => {
    addNewMessage(values);
    resetForm();
    setSubmitting(false);
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Add a Message:</Card.Title>
        <Formik
          validationSchema={schema}
          onSubmit={handleFormData}
          initialValues={{ name: '', msgText: '' }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            errors
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Row className="align-items-center">
                <Form.Group as={Col} md={6} controlId="name">
                  <Form.Label>Enter Name:</Form.Label>
                  <Form.Control
                    placeholder="Your name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.name && !errors.name}
                    isInvalid={touched.name && errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md={6} controlId="msgText">
                  <Form.Label>Enter Message:</Form.Label>
                  <Form.Control
                    placeholder="Your message"
                    value={values.msgText}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.msgText && !errors.msgText}
                    isInvalid={touched.msgText && errors.msgText}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.msgText}
                  </Form.Control.Feedback>
                </Form.Group>
                <Col md={12}>
                  <Button variant="primary" type="submit" className="mt-3">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

export default NewMessageForm;
