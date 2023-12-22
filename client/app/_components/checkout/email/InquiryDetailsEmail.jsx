import * as React from "react"
import { Html, Body, Container, Tailwind, Head, Text, Heading, Section, Row, Column, Img, Preview } from "@react-email/components"
import dayjs from "dayjs"

export function InquiryDetailsEmail({ inquiry }) {
  const { full_name: fullName, email_address: emailAddress, facebook_link: facebookLink, phone_number: phoneNumber } = inquiry
  const { event_type: eventType, event_place: eventPlace, event_date: eventDate, expand: { main_package: mainPackage, addons: addOns } } = inquiry
  const { items_total_cost: itemsTotalCost, preferred_design_description: preferredDesignDescription } = inquiry
  const { preferred_design_samples_image_paths: preferredDesignSamplesImagePaths, acquisition_survey: acquisitionSurvey } = inquiry
  const formattedEventDate = dayjs(eventDate).format('MMMM-DD-YYYY')
  const formattedAddOns = `[${addOns?.map((addOn) => addOn.title).join(", ") ?? ''}]`

  return (
    <Html>
      <Head />
      <Preview>Beyond Decor Inquiry Details</Preview>
      <Tailwind>
        <Body className="bg-white mx-auto my-12 font-serif">
          <Container className="mx-auto shadow-xl rounded-xl p-16">
            <Heading className="mb-0">Beyond Decor Inquiry Details</Heading>

            <Container>
              <Text className="font-bold uppercase mb-0">Client details</Text>
              <Container className="flex gap-10">
                <Text className="inline capitalize opacity-60">full name: </Text>
                <Text className="inline">{fullName}</Text>
              </Container>
              <Container className="flex gap-10">
                <Text className="inline capitalize opacity-60">email address: </Text>
                <Text className="inline">{emailAddress}</Text>
              </Container>
              <Container className="flex gap-10">
                <Text className="inline capitalize opacity-60">facebook link: </Text>
                <Text className="inline">{facebookLink}</Text>
              </Container>
              <Container className="flex gap-10">
                <Text className="inline capitalize opacity-60">phone number: </Text>
                <Text className="inline">{phoneNumber}</Text>
              </Container>
            </Container>

            <Container>
              <Text className="font-bold uppercase mb-0">Event details</Text>
              <Container className="flex gap-10">
                <Text className="inline capitalize opacity-60">Occasion: </Text>
                <Text className="inline">{eventType}</Text>
              </Container>
              <Container className="flex gap-10">
                <Text className="inline capitalize opacity-60">Where: </Text>
                <Text className="inline">{eventPlace}</Text>
              </Container>
              <Container className="flex gap-10">
                <Text className="inline capitalize opacity-60">When: </Text>
                <Text className="inline">{formattedEventDate}</Text>
              </Container>
              <Container className="flex gap-10">
                <Text className="inline capitalize opacity-60">Package</Text>
                <Text className="inline">{mainPackage?.title ?? ''}</Text>
              </Container>
              <Container className="flex  gap-10">
                <Text className="inline capitalize opacity-60">Add-ons</Text>
                <Text className="inline">{formattedAddOns}</Text>
              </Container>
            </Container>

            {itemsTotalCost > 0 && <>

              <Container>
                <Text className="font-bold uppercase mb-0">Items breakdown</Text>
                <Section className="rounded-xl m-0">
                  <Row>
                    <Column>
                      <Text className="font-bold m-0 opacity-60">Item</Text>
                      {mainPackage && <Row>{mainPackage.title}</Row>}
                      {addOns && addOns.map((addOn, index) => (
                        <Row key={`AddOnTitle-${index}`}>{addOn.title}</Row>
                      ))}
                      <Text className="font-bold m-0 opacity-60">Total</Text>
                    </Column>
                    <Column>
                      <Text className="font-bold m-0 opacity-60">Price</Text>
                      {mainPackage && <Row>{mainPackage.price.toLocaleString()}</Row>}
                      {addOns && addOns.map((addOn, index) => (
                        <Row key={`AddOnPrice-${index}`}>{addOn.price.toLocaleString()}</Row>
                      ))}
                      <Text className="font-bold m-0 opacity-60">{itemsTotalCost.toLocaleString()}</Text>
                    </Column>
                  </Row>
                </Section>
              </Container>
            </>}

            <Container>
              <Text className="font-bold uppercase mb-0">Preferred design</Text>
              <Container className="flex">
                <Text className="inline capitalize opacity-60">Description: </Text>
                <Text className="inline">{preferredDesignDescription}</Text>
              </Container>
              {preferredDesignSamplesImagePaths.length > 0 && <>
                <Container className="mt-2">
                  {preferredDesignSamplesImagePaths.map((image_path, index) => (
                    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
                    <img className="my-2" key={`PreferredDesignSample-${index}`} src={image_path} />
                  ))}
                </Container>
              </>}
            </Container>

            <Container>
              <Text className="font-bold uppercase mb-0">How it heard about Beyond Decor</Text>
              <Text className="inline">{acquisitionSurvey}</Text>
            </Container>

            <Container>
              <Text className="font-bold uppercase mb-0">Contact us</Text>
              <Container className="flex gap-10">
                <Text className="inline capitalize opacity-60">Phone number: </Text>
                <Text className="inline">0953-239-7219</Text>
              </Container>
              <Container className="flex gap-10">
                <Text className="inline capitalize opacity-60">Facebook: </Text>
                <Text className="inline">facebook.com/beyonddecorph</Text>
              </Container>
              <Container className="flex gap-10">
                <Text className="inline capitalize opacity-60">Email: </Text>
                <Text className="inline">beyonddecorph@gmail.com</Text>
              </Container>
            </Container>

          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

