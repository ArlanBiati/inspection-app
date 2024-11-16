import { Tabs } from 'expo-router'

import TabBar from '@/components/tab-bar'

export default function TabsLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false
        }}
      />

      <Tabs.Screen
        name="inspection"
        options={{
          title: 'Vistorias',
          headerStyle: {
            backgroundColor: '#000'
          },
          headerTintColor: '#fff'
        }}
      />
    </Tabs>
  )
}
