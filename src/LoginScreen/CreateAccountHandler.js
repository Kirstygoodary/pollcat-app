import React, { Component } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
  StyleSheet,
  Platform
} from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Icon
} from "native-base";
import firebase from "../Auth/Firebase";

export default class CreateAccountHandler extends Component {
  state = {
    email: null,
    displayName: null,
    password: null,
    repeatPassword: null,
    error: null,
    passwordCheck: true
  };

  render() {
    const errorHandler = {
      "auth/user-not-found": "User not found",
      "auth/invalid-email": "Invalid email address",
      "auth/wrong-password": "Wrong password",
      "auth/user-disabled": "Account disabled"
    };
    return (
      <Container style={styles.container}>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label> Email Address </Label>
              <Input
                style={styles.input}
                title="email"
                placeholder="Email Address"
                onChangeText={text =>
                  this.setState({ email: text, error: null })
                }
                onFocus={() => {
                  this.setState({ error: null });
                }}
                value={this.state.email}
                keyboardType="email-address"
                returnKeyType="next"
                textContentType="emailAddress"
                autoCorrect={false}
                autoCapitalize="none"
              />
            </Item>
            <Item floatingLabel>
              <Label> Password (at least 8 characters)</Label>
              <Input
                style={styles.input}
                title="password"
                placeholder="Password"
                onChangeText={text =>
                  this.setState({ password: text, error: null })
                }
                onFocus={() => {
                  this.setState({ error: null });
                }}
                value={this.state.password}
                secureTextEntry={true}
                textContentType="password"
                autoCorrect={false}
                autoCapitalize="none"
              />
            </Item>
            <Item
              floatingLabel
              // success={
              //   this.state.passwordCheck ? this.state.passwordCheck : false
              // }
            >
              <Label>Repeat Password</Label>
              <Input
                style={styles.input}
                title="repeat password"
                placeholder="repeat password"
                onChangeText={text =>
                  this.setState({ repeatPassword: text, error: null })
                }
                onFocus={() => {
                  this.setState({ error: null });
                }}
                value={this.state.repeatPassword}
                secureTextEntry={true}
                textContentType="password"
                autoCorrect={false}
                autoCapitalize="none"
              />
            </Item>
            <Button
              style={styles.button}
              onPress={() => {
                const { email, password, repeatPassword } = this.state;
                this.firebaseCreateAccountHandler(
                  email,
                  password,
                  repeatPassword
                );
              }}
              block
              primary
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </Button>
          </Form>
          {this.state.error && (
            <Text style={styles.error}>
              {errorHandler[this.state.error.code]
                ? errorHandler[this.state.error.code]
                : this.state.error.message}
            </Text>
          )}
        </Content>
      </Container>
    );
  }

  // render() {
  //   const errorHandler = {
  //     "auth/user-not-found": "User not found",
  //     "auth/invalid-email": "Invalid email address",
  //     "auth/wrong-password": "Wrong password",
  //     "auth/user-disabled": "Account disabled"
  //   };
  //   return (
  //     <KeyboardAvoidingView
  //       behavior={Platform.OS === "ios" ? "padding" : null}
  //       style={{
  //         flex: 1,
  //         alignItems: "center",
  //         justifyContent: "center"
  //       }}
  //     >
  //       <SafeAreaView>
  //         {this.state.error && (
  //           <Text>
  //             {errorHandler[this.state.error.code]
  //               ? errorHandler[this.state.error.code]
  //               : this.state.error.message}
  //           </Text>
  //         )}
  //         <Text>Email Address</Text>
  //         <TextInput
  //           style={styles.input}
  //           title="email"
  //           placeholder="Email Address"
  //           onChangeText={text => this.setState({ email: text, error: null })}
  //           value={this.state.email}
  //           keyboardType="email-address"
  //           returnKeyType="next"
  //         ></TextInput>
  //         <Text>Display Name</Text>
  //         <TextInput
  //           style={styles.input}
  //           title="email"
  //           placeholder="Display Name"
  //           onChangeText={text =>
  //             this.setState({ displayName: text, error: null })
  //           }
  //           value={this.state.displayName}
  //           returnKeyType="next"
  //         ></TextInput>
  //         <Text>Password</Text>
  //         <TextInput
  //           style={styles.input}
  //           title="password"
  //           placeholder="Password"
  //           onChangeText={text =>
  //             this.setState({ password: text, error: null })
  //           }
  //           value={this.state.password}
  //           returnKeyType="next"
  //           secureTextEntry={true}
  //           textContentType="newPassword"
  //         ></TextInput>
  //         <Text>Repeat Password</Text>
  //         <TextInput
  //           style={styles.input}
  //           title="password"
  //           placeholder="Repeat Password"
  //           onChangeText={text =>
  //             this.setState({ repeatPassword: text, error: null })
  //           }
  //           value={this.state.repeatPassword}
  //           secureTextEntry={true}
  //         ></TextInput>
  //         <Button
  //           title="Sign Up"
  //           onPress={() => {
  //             const {
  //               email,
  //               displayName,
  //               password,
  //               repeatPassword
  //             } = this.state;
  //             this.firebaseCreateAccountHandler(
  //               email,
  //               displayName,
  //               password,
  //               repeatPassword
  //             );
  //           }}
  //         ></Button>
  //       </SafeAreaView>
  //     </KeyboardAvoidingView>
  //   );
  // }

  async firebaseCreateAccountHandler(email, password, repeatPassword) {
    if (password !== repeatPassword) {
      this.setState({
        error: { message: "Passwords do not match" }
      });
    } else if (!email) {
      this.setState({
        error: { message: "Please complete all fields" }
      });
    } else if (password.length < 8) {
      this.setState({
        error: { message: "Password should be 8 characters or more" }
      });
    } else {
      const newUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(error => {
          this.setState({ error });
        });

      if (await newUser) {
        this.props.navigation.navigate("CreateDisplayName");
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center"
  },
  input: {
    marginTop: 10
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    height: 50
  },
  buttonText: {
    color: "white",
    fontSize: 18
  },
  error: {
    color: "red",
    fontSize: 20,
    marginTop: 20,
    alignContent: "center",
    flex: 1
  }
});
