import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';
import * as React from 'react';

interface AppInviteEmailProps {
  username?: string;
  invitedByUsername?: string;
  invitedByEmail?: string;
  teamName?: string;
  inviteLink?: string;
}

export const AppInviteEmail = ({
  username,
  invitedByUsername,
  invitedByEmail,
  teamName,
  inviteLink,
}: AppInviteEmailProps) => {
  const previewText = `¡${invitedByUsername} te ha invitado a unirte a ${teamName}!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              ¡Unéte al equipo <strong>{teamName}</strong>!
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">Hola {username},</Text>
            <Text className="text-black text-[14px] leading-[24px]">
              <strong>{invitedByUsername}</strong> (
              <Link href={`mailto:${invitedByEmail}`} className="text-blue-600 no-underline">
                {invitedByEmail}
              </Link>
              ) te ha invitado a unirte al equipo <strong>{teamName}</strong>.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={inviteLink}
              >
                ¡Unirse al equipo!
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              o copia y pega esta URL en tu navegador:
              <Link href={inviteLink} className="text-blue-600 no-underline">
                {inviteLink}
              </Link>
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Esta invitación fue destinada para <span className="text-black">{username}</span>. Si no esperabas esta
              invitación, puedes ignorar este correo.
            </Text>
            <Text className="text-[#666666] text-[12px] leading-[24px] mt-[20px]">
              Por favor ten en cuenta que esta invitación solo tiene una duración de 24 horas.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

AppInviteEmail.PreviewProps = {
  username: 'carlossanz',
  invitedByUsername: 'María',
  invitedByEmail: 'maria.gonzalez@example.com',
  teamName: 'TurismoLocal',
  inviteLink: 'https://turismolocal.com/teams/invite/foo',
} as AppInviteEmailProps;

export default AppInviteEmail;
