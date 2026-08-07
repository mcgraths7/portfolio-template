import { Button, Heading, Lead, Text } from "@sorbet/component-library/atoms";
import { Cluster, Container, Stack } from "@sorbet/component-library/layout";
import { Card, CardBody, Tab, TabList, TabPanel, Tabs } from "@sorbet/component-library/molecules";

import { ThemeControl } from "./theme-control";

/**
 * Smoke page. No "use client" here on purpose — this is a Server Component,
 * and it stays one. It proves both halves of the boundary at once:
 *
 *   - Container, Stack, Heading, Lead, Text, Card and a link-flavoured Button
 *     render on the server, shipping no JavaScript.
 *   - Tabs is a client component. A Server Component may render it because it
 *     is used uncontrolled — `defaultValue` is a string, not a callback, so
 *     nothing unserializable crosses the boundary.
 *
 * Replaced by the CMS-driven renderer once the content model exists.
 */
export default function Home() {
  return (
    <Container>
      <Stack gap={8}>
        <Stack gap={3}>
          <Heading level={1}>Portfolio template</Heading>
          <Lead>
            Sorbet is vendored and rendering. Everything above the tabs is a Server Component.
          </Lead>
          {/* A client island rendered from a Server Component, same as Tabs
              below: useTheme needs the context, this page does not. */}
          <ThemeControl />
        </Stack>

        <Card>
          <CardBody>
            <Stack gap={4}>
              <Heading level={2}>Server-rendered</Heading>
              <Text>
                This card, its heading and this paragraph ship as HTML with no client bundle.
              </Text>
              {/* Cluster, not Stack: Stack stretches its children, and a button
                  should be its own width. Layout owns placement. */}
              <Cluster gap={3}>
                <Button as="a" href="https://github.com/mcgraths7/sorbet">
                  A link-flavoured Button
                </Button>
              </Cluster>
            </Stack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stack gap={4}>
              <Heading level={2}>Client island</Heading>
              <Text>
                Tabs carries its own &quot;use client&quot; boundary, so this Server Component can
                render it without becoming one.
              </Text>
              <Tabs defaultValue="one">
                <TabList>
                  <Tab value="one">First</Tab>
                  <Tab value="two">Second</Tab>
                </TabList>
                <TabPanel value="one">
                  <Text>If this panel switches when you click, hydration worked.</Text>
                </TabPanel>
                <TabPanel value="two">
                  <Text>Second panel. The boundary holds.</Text>
                </TabPanel>
              </Tabs>
            </Stack>
          </CardBody>
        </Card>
      </Stack>
    </Container>
  );
}
