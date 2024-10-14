import { Body, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text } from '@react-email/components';
import * as React from 'react';

interface RaycastMagicLinkEmailProps {
  verificationLink?: string;
  bussinessName?: string;
  address?: string;
  city?: string;
}

export const EmailVerification = ({ verificationLink, bussinessName, address, city }: RaycastMagicLinkEmailProps) => (
  <Html>
    <Head />
    <Preview>Verifica tu dirección de correo electrónico</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>🔒 Verifica tu dirección de correo electrónico</Heading>
        <Section style={body}>
          <Text style={paragraph}>
            <Link style={link} href={verificationLink}>
              👉 Haz clic aquí para verificar tu dirección de correo electrónico 👈
            </Link>
          </Text>
          <Text style={paragraph}>Si no creaste una cuenta, puedes ignorar este correo electrónico.</Text>
        </Section>
        <Text style={paragraph}>
          Saludos,
          <br />
          {bussinessName}
        </Text>
        <Hr style={hr} />
        <Text style={footer}>Alaska Technologies Inc.</Text>
        <Text style={footer}>
          {address}, {city}
        </Text>
        <Hr style={hr} />
        <Text style={{ ...paragraph, fontSize: '12px' }}>
          Si el enlace no funciona, copia y pega la siguiente URL en la barra de direcciones de tu navegador:{' '}
          <Link style={link} href={verificationLink}>
            {verificationLink}
          </Link>
        </Text>
      </Container>
    </Body>
  </Html>
);

EmailVerification.PreviewProps = {
  verificationLink: 'https://raycast.com',
  bussinessName: 'Raycast',
  address: 'Transversal 1Ba',
  city: 'La Jagua de Ibirico',
} as RaycastMagicLinkEmailProps;

export default EmailVerification;

const main = {
  backgroundColor: '#f9fafb',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 25px 48px',
  maxWidth: '600px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
};

const heading = {
  fontSize: '28px',
  fontWeight: 'bold',
  marginTop: '48px',
  textAlign: 'center',
  color: '#333333',
};

const body = {
  margin: '24px 0',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#4a4a4a',
};

const link = {
  color: '#FF6363',
  textDecoration: 'none',
  fontWeight: 'bold',
};

const hr = {
  borderColor: '#dddddd',
  marginTop: '48px',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  marginTop: '20px',
  textAlign: 'center',
};
