class NeuralNetwork {
  constructor(input_nodes, hidden_nodes, output_nodes, learning_rate=0.01, debug=false) {

    this.input_nodes = input_nodes;
    this.hidden_nodes = hidden_nodes;
    this.output_nodes = output_nodes;

    // setting the weights and biass
    this.weights_ih = new Matrix(this.input_nodes, this.hidden_nodes, true);
    this.weights_ho = new Matrix(this.hidden_nodes, this.output_nodes, true);

    // setting the bias
    this.bias_h = new Matrix(1, this.hidden_nodes, true);
    this.bias_o = new Matrix(1, this.output_nodes, true);

    this.debug = debug;
    this.learning_rate = learning_rate;

    if (this.debug) {
      console.log('input to  hidden | hidden to output | bias hidden | bias output');
      this.weights_ih.print();
      this.weights_ho.print();
      this.bias_h.print();
      this.bias_o.print();
      console.log('---')
    }

  }

  feedforward(input_array, giveHiddenOutput=false) {

    // converting array to matrix
    let input_matrix = Matrix.fromArray(input_array);

    // getting the output of the hidden neurons
    let hidden_output = Matrix.product(this.weights_ih, input_matrix);

    // adding the bias's
    hidden_output.add(this.bias_h);

    // mapping the hidden output with sigmoid
    hidden_output.map(this.sigmoid);

    // calculating the output of the neural network
    let output = Matrix.product(this.weights_ho, hidden_output);

    // adding the bias's
    output.add(this.bias_o);

    // mapping the output with sigmoid
    output.map(this.sigmoid)

    // convertying to array
    let output_array = output.toArray();

    if (giveHiddenOutput) {
      return [output, hidden_output];
    } else {
      return output_array;
    }



  }

  train(input_array, target_array) {

    // convertin target to matrix
    let target_matrix = Matrix.fromArray(target_array);
    let input_matrix = Matrix.fromArray(input_array);

    // get the guess
    let guess_data = this.feedforward(input_array, true);

    // getting the values that the neural network and hidden nodes give back from the guess_data function
    let output = guess_data[0];
    let hidden = guess_data[1];

    // calculating the errors of the output
    let error_outputs = Matrix.substract(target_matrix, output);

    // calculating the errors of the hidden
    let weights_ho_t = Matrix.transpose(this.weights_ho)
    let error_hidden = Matrix.product(weights_ho_t, error_outputs);

    // now we have to calculate the gradients and also the deltas


    // calculating the gradients of the output
    let gradients_output = Matrix.map(output, this.dsigmoid);

    // taking the matrx prodcut of the gradients and the errors
    gradients_output.multiply(error_outputs);

    // multiplying each element of the gradient times the learning rate
    gradients_output.multiply(this.learning_rate);

    // in order to get the deltas we need to multply gradients times the transposed matrix of the hidden nodes' output
    let hidden_t = Matrix.transpose(hidden);

    // calculating the detlas
    let delta_weights_ho = Matrix.product(gradients_output, hidden_t);

    // now we can adjust the weights and bias
    this.weights_ho.add(delta_weights_ho);
    this.bias_o.add(gradients_output);

    // calculating the gradients of the hidden
    let gradients_hidden = Matrix.map(hidden, this.dsigmoid);

    // taking the matrx prodcut of the gradients and the errors
    gradients_hidden.multiply(error_hidden);

    // multiplying each element of the gradient times the learning rate
    gradients_hidden.multiply(this.learning_rate);

    // in order to get the deltas we need to multply gradients times the transposed matrix of the hidden nodes' output
    let input_matrix_t = Matrix.transpose(input_matrix);

    // calculating the detlas
    let delta_weights_ih = Matrix.product(gradients_hidden, input_matrix_t);

    // now we can adjust the weights and bias
    this.weights_ih.add(delta_weights_ih);
    this.bias_h.add(gradients_hidden);

  }


  sigmoid(x) {
    return 1/(1+Math.exp(-x));
  }

  dsigmoid(y) {
    return y  *(1-y);
  }

}
