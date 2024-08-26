//IMPORTS
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import LocalStyles from './styles.js';

//MAIN
export default function AboutScreen({ navigation }) {
  return (
    <View style={LocalStyles.container}>
      <View style={LocalStyles.main}>
        <Text style={LocalStyles.title}>Sobre</Text>
      </View>
      <View style={LocalStyles.intro}>
        <Text style={LocalStyles.introText}>
          Bem-vindo a página de sobre. Aqui você vai ser informar sobre:
          * Resumo / informações gerais;
          * Versionamento do aplicativo;
        </Text>
      </View>
      <ScrollView style={LocalStyles.scrollView}>
        <Text style={LocalStyles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
          augue eros. Praesent fermentum ultricies tortor, at bibendum purus
          elementum vel. Vestibulum eget mauris vel augue mollis auctor.
          Integer eleifend ac purus eget gravida. Sed ut faucibus nulla.
          Aenean auctor urna eu velit tincidunt interdum. Sed lobortis eros
          a neque aliquet lobortis. Nulla eget malesuada ipsum, a lacinia
          massa. Nullam tristique leo a ipsum iaculis, eu convallis nisl
          tempor. Sed vestibulum velit quis augue interdum dapibus. Sed
          congue sapien vitae dolor malesuada convallis. Praesent tincidunt
          a arcu vel convallis. Curabitur ac sem a libero tincidunt
          consequat quis sit amet turpis.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
          augue eros. Praesent fermentum ultricies tortor, at bibendum purus
          elementum vel. Vestibulum eget mauris vel augue mollis auctor.
          Integer eleifend ac purus eget gravida. Sed ut faucibus nulla.
          Aenean auctor urna eu velit tincidunt interdum. Sed lobortis eros
          a neque aliquet lobortis. Nulla eget malesuada ipsum, a lacinia
          massa. Nullam tristique leo a ipsum iaculis, eu convallis nisl
          tempor. Sed vestibulum velit quis augue interdum dapibus. Sed
          congue sapien vitae dolor malesuada convallis. Praesent tincidunt
          a arcu vel convallis. Curabitur ac sem a libero tincidunt
          consequat quis sit amet turpis.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
          augue eros. Praesent fermentum ultricies tortor, at bibendum purus
          elementum vel. Vestibulum eget mauris vel augue mollis auctor.
          Integer eleifend ac purus eget gravida. Sed ut faucibus nulla.
          Aenean auctor urna eu velit tincidunt interdum. Sed lobortis eros
          a neque aliquet lobortis. Nulla eget malesuada ipsum, a lacinia
          massa. Nullam tristique leo a ipsum iaculis, eu convallis nisl
          tempor. Sed vestibulum velit quis augue interdum dapibus. Sed
          congue sapien vitae dolor malesuada convallis. Praesent tincidunt
          a arcu vel convallis. Curabitur ac sem a libero tincidunt
          consequat quis sit amet turpis.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
          augue eros. Praesent fermentum ultricies tortor, at bibendum purus
          elementum vel. Vestibulum eget mauris vel augue mollis auctor.
          Integer eleifend ac purus eget gravida. Sed ut faucibus nulla.
          Aenean auctor urna eu velit tincidunt interdum. Sed lobortis eros
          a neque aliquet lobortis. Nulla eget malesuada ipsum, a lacinia
          massa. Nullam tristique leo a ipsum iaculis, eu convallis nisl
          tempor. Sed vestibulum velit quis augue interdum dapibus. Sed
          congue sapien vitae dolor malesuada convallis. Praesent tincidunt
          a arcu vel convallis. Curabitur ac sem a libero tincidunt
          consequat quis sit amet turpis.
          velLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
          augue eros. Praesent fermentum ultricies tortor, at bibendum purus
          elementum vel. Vestibulum eget mauris vel augue mollis auctor.
          Integer eleifend ac purus eget gravida. Sed ut faucibus nulla.
          Aenean auctor urna eu velit tincidunt interdum. Sed lobortis eros
          a neque aliquet lobortis. Nulla eget malesuada ipsum, a lacinia
          massa. Nullam tristique leo a ipsum iaculis, eu convallis nisl
          tempor. Sed vestibulum velit quis augue interdum dapibus. Sed
          congue sapien vitae dolor malesuada convallis. Praesent tincidunt
          a arcu vel convallis. Curabitur ac sem a libero tincidunt
          consequat quis sit amet turpis.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
          augue eros. Praesent fermentum ultricies tortor, at bibendum purus
          elementum vel. Vestibulum eget mauris vel augue mollis auctor.
          Integer eleifend ac purus eget gravida. Sed ut faucibus nulla.
          Aenean auctor urna eu velit tincidunt interdum. Sed lobortis eros
          a neque aliquet lobortis. Nulla eget malesuada ipsum, a lacinia
          massa. Nullam tristique leo a ipsum iaculis, eu convallis nisl
          tempor. Sed vestibulum velit quis augue interdum dapibus. Sed
          congue sapien vitae dolor malesuada convallis. Praesent tincidunt
          a arcu vel convallis. Curabitur ac sem a libero tincidunt
          consequat quis sit amet turpis.
        </Text>
      </ScrollView>
    </View>
  );
}