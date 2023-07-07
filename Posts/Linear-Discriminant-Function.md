# Linear Discriminant Function

Notes on Chapter 3 of "Pattern Recognition and Machine Learning".

<!--more-->

## Linear Discriminant Function

### General Form of n-dimensional Linear Discriminant Function

The general form of an n-dimensional linear discriminant function is:

$$
d(x) = w_1x_1 + w_2x_2 + \dots + w_nx_n + b = W_0^Tx + b
$$

where $W_0 = (w_1, w_2, \dots, w_n)^T$ is the **weight vector**. If we include b in the weight vector, then $d(x) = W^Tx$, where $x = (x_1, x_2, \dots, x_n, 1)$ is the augmented feature vector (with the feature value of b being 1) and $W = (w_1, w_2, \dots, w_n, b)^T$ is the augmented weight vector.

### Two-Class Case

If the samples belong to only two classes, $\omega_1$ and $\omega_2$, then we can use a single linear discriminant function for classification:

$$
d(x) = W^Tx = \left\{
  \begin{array}{ll}  
             >0 &  \text{if } x \in \omega_1\\  
             \leq 0 & \text{if } x \in \omega_2
             \end{array}  
\right.
$$

### Multi-Class Case

#### Multi-Class Case 1

In this case, we use a linear discriminant function to separate patterns belonging to class $\omega_i$ from patterns not belonging to class $\omega_i$. The discriminant function is given by:

$$
d(x) = W^Tx = \left\{
  \begin{array}{ll}  
             >0 &  \text{if } x \in \omega_i\\  
             \leq 0 & \text{if } x \notin \omega_i
             \end{array}  
\right.
$$

This is called the $w_i/\bar{w}_i$ two-class method, where the multi-class problem is divided into M two-class problems. Therefore, there are **M discriminant functions**. Each class has its own discriminant function that only classifies that particular class.

To classify a sample, we evaluate all the discriminant functions and select the one with the highest value as the class label. If only one discriminant function classifies the sample as positive and all others classify it as negative, then the classification is successful. Otherwise, the classification is ambiguous. The region of ambiguity is called the **indecision region**.

The decision boundaries **do not intersect classes**. Each discriminant boundary can accurately classify one class of samples.

The indecision region is the area in the figure that is not covered by any discriminant function. It includes the triangular region enclosed by the three lines and the regions extending from the three vertices.

#### Multi-Class Case 2

In this case, each discriminant function is used to classify a pair of patterns, one from $\omega_i$ class and the other from $\omega_j$ class. The discriminant function is given by:

$$
d_{ij}(x) = W_{ij}^Tx
$$

where $d_{ij}(x) > 0$ for all $j \neq i$ classifies the sample as belonging to class $\omega_i$. For a multi-class problem with M classes, there are a total of M(M-1)/2 discriminant functions.

The decision boundaries intersect classes, so a single discriminant function cannot accurately classify a complete class. Therefore, multiple discriminant functions are needed to assist in classification. Only when all the discriminant functions classify the sample into the same class can its class label be determined.

The indecision region is now limited to the triangular region enclosed by the three lines. Thus, in multi-class Case 2, the possibility of linear separability of patterns is higher than in multi-class Case 1.

#### Multi-Class Case 3

Multi-class Case 3 is a special case where there is no indecision region. The condition for this is that:

$d_{ij}(x) = d_i(x) - d_j(x) = (W_i^T - W_j^T)x$. Therefore, if $d_{ij}(x) > 0$, then $d_i(x) > d_j(x)$ for all $j \neq i$. In this case, there is no indecision region, and the discriminant boundaries intersect at a single point. For a multi-class problem with M classes, there are M discriminant functions.

By satisfying the above condition, only when $d_i(x)$ is greater than all $d_j(x)$, it can be ensured that all $d_{ij}(x) > 0$. Therefore, when evaluating a sample with all the discriminant functions, the class label is determined by the discriminant function with the largest value

## Generalized Linear Discriminant Function

### Motivation

- Linear discriminant functions are simple and easy to implement.
- Nonlinear discriminant functions are complex and not easy to implement.
- If we can transform a nonlinear discriminant function into a linear one, it will be beneficial for implementing pattern classification.

### Basic Idea

If the patterns are not linearly separable in a low-dimensional space (the discriminant function is nonlinear in the low-dimensional space), we can map the samples to a high-dimensional space where they can be linearly separable using a nonlinear transformation (e.g., polynomial transformation), and then use a linear discriminant function to classify them in the high-dimensional space.

For the original sample vector x, it can be transformed to:

$$
x^* = (f_1(x), f_2(x), \dots, f_k(x))^T, \quad k > n
$$

### Total Number of Terms

For an n-dimensional x vector, if we use an r-th order polynomial, the total number of terms in the weight vector w of d(x) is given by:

$$
N_w = C_{n+r}^r = \frac{(n+r)!}{n!r!}
$$


## Fisher Linear Discriminant

The Fisher Linear Discriminant is a method for finding a weight vector, denoted as W, that projects the data from a d-dimensional space to a one-dimensional space in such a way that the classes can be separated.

### Basic Parameters

In the Fisher Linear Discriminant, the following parameters are considered:

#### d-dimensional x-space

1. Sample Mean Vectors: The mean vectors for each class in the d-dimensional space.
2. Within-Class Scatter Matrix and Total Within-Class Scatter Matrix: These matrices provide information about the scatter within each class and the overall scatter within all classes.
3. Between-Class Scatter Matrix: This matrix provides information about the scatter between different classes.

#### 1-dimensional Y-space

1. Sample Mean Vectors: The mean vectors for each class in the one-dimensional space.
2. Within-Class Scatter Matrix and Total Within-Class Scatter Matrix: These matrices provide information about the scatter within each class and the overall scatter within all classes.

The goal is to find a weight vector W that maximizes the between-class scatter while minimizing the within-class scatter in the one-dimensional space.

## Perceptron

The perceptron algorithm is used for binary classification problems. It aims to find a hyperplane that separates the data points of two classes. The algorithm iteratively adjusts the weight vector based on misclassified samples until all samples are correctly classified.

In the case of two classes, the perceptron algorithm uses the distance from the misclassified samples to the decision plane as the objective function. The algorithm updates the weight vector in the direction of the negative gradient, which is the direction of the misclassified sample.

The perceptron algorithm allows for multiple solutions, and introducing a bias term (b) allows for a margin or offset in the decision plane. The distance can be interpreted as a measure of confidence.

## Multi-Class Case 3

In the multi-class case with more than two classes, there is a separate discriminant function for each class. The objective is to ensure that the discriminant function $d_i(x)$ for class $\omega_i$ is always the largest (not equal to any other discriminant functions). If $d_i(x)$ is not the largest, the corresponding discriminant function is adjusted by adding or subtracting the difference between $x_i$ and the maximum value.

In each iteration, the same sample needs to be evaluated with all discriminant functions, and then adjustments are made to all discriminant functions.

## Gradient Descent

In the gradient descent method, a criterion function (objective function) sensitive to misclassification is defined. The gradient vector of the criterion function is computed, and the weight coefficients are updated in the direction opposite to the negative gradient for misclassified samples.

The perceptron algorithm chooses the criterion function as the margin (functional margin) of the misclassified samples: $y_i(wx_i + b)$.

Different criterion functions lead to different gradients, and therefore, different values for updating the weight coefficients.

## Least Mean Square Error Algorithm

The Least Mean Square Error (LMSE) algorithm can handle cases where patterns are not linearly separable. It provides convergence for separable patterns and can indicate the non-separability of classes.

The classification problem is formulated as an inequality equation for the classifier. All the samples, after augmentation, are written into a matrix X, which is an N * (D+1) matrix, where each row represents a specific sample. N is the total number of samples, and the samples from the negative class are multiplied by -1 for normalization. The requirement for the decision plane is $Xw > 0$, where W is a weight vector of D+1 dimensions. The multiplication results in a column vector of size N, representing $w^Tx$ for each sample.

The H-K algorithm aims to solve the equation $Xw = b$, where $b = (b_1, b_2, \dots, b_n)^T$ with all components being positive. Since X is an N * (D+1) matrix with N greater than D+1, it is an overdetermined equation, and there is generally no exact solution. However, a linear least squares solution can be obtained.

By considering b as the true values, the square error is defined as $(w^Tx - b)^2$. The criterion function is then defined as:

$$
J(w,x,b) = \frac{1}{2}\sum_{i=1}^{n}(w^Tx_i - b_i)^2 = \frac{1}{2}\sum_{i=1}^{n}||w^Tx_i - b_i||^2 = \frac{1}{2}(Xw - b)^T(Xw - b)
$$

## Potential Function

The potential function is a method for nonlinear classification. The discriminant function is generated based on the potential function of the sample vectors. Each sample point corresponds to a position and has a potential energy associated with it.

In each iteration step, the accumulated potential is determined based on the cumulative potential of all individual potential functions up to that step.

K(x) is used to represent the accumulated potential function. If the newly added training sample, x_k+1, is misclassified, the cumulative function is modified. If it is correctly classified, the cumulative function remains unchanged.

In the case of two classes, samples from class $\omega_1$ contribute positive potential energy, while samples from class $\omega_2$ contribute negative potential energy.

During the iteration, only misclassified samples contribute to the cumulative potential. If a sample with positive potential energy is misclassified (results in a negative value when evaluated with the cumulative potential function), the cumulative potential is increased by the potential energy of that point. Conversely, if a sample with negative

potential energy is misclassified (results in a positive value when evaluated with the cumulative potential function), the cumulative potential is decreased by the potential energy of that point.

The potential function is obtained by accumulating the potential functions of misclassified samples.

There are two types of potential functions:

1. Type 1: It can be represented using a symmetric finite polynomial expansion:

   $$
   K(x, x_k) = \sum_{i=1}^m \phi_i(x) \phi_i(x_k)
   $$

   Here, the potential function is calculated by multiplying and then summing the individual potential functions, where $\phi_i(x_k)$ can be interpreted as the weight associated with each sample point.

   The iteration relationship is given as:

   $$
   d_{k+1}(x) = \sum_{i=1}^m C_i(k+1) \phi_i(x) \\
   C_i(k+1) = C_i(k) + r_{k+1} \phi_i(x_{k+1})
   $$

   The potential function is fixed for each sample, but the discriminant function, represented by the cumulative potential function, updates continuously as new samples are added, especially for misclassified samples.
2. Type 2: A symmetric function of two variables x and x_k is chosen as the potential function, i.e., K(x, x_k) = K(x_k, x), which can be expanded into an infinite series. Examples of such potential functions are:

   $$
   K(x, x_k) = e^{-\alpha||x - x_k||^2} \\
   K(x, x_k) = \frac{1}{1 - \alpha||x - x_k||^2} \quad (\alpha > 0) \\
   K(x, x_k) = \frac{{\sin(\alpha||x - x_k||^2)}}{{\alpha||x - x_k||^2}}
   $$
