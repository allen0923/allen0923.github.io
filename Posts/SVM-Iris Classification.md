# Classification of Iris Flowers Using SVM

## **Task Description:**

Build a model to classify iris flowers into three different species based on the size of their sepal and petal.


***Features***

| Sepal Length | Sepal Width | Petal Length | Petal Width |
| ------------ | ----------- | ------------ | ----------- |
| 5.1          | 3.3         | 1.7          | 0.5         |
| 5.0          | 2.3         | 3.3          | 1.0         |
| 6.4          | 2.8         | 5.6          | 2.2         |

***Result***

| Species (Label)     |
| :------------------ |
| 0 (Iris Setosa)     |
| 1 (Iris Versicolor) |
| 2 (Iris Virginica)  |

## **Dataset:**

The dataset consists of 150 rows of data.

Each row contains 4 feature values and a target value.

The 4 feature values are: sepal length, sepal width, petal length, petal width.

The target value represents three different species of iris flowers: Iris Setosa, Iris Versicolour, Iris Virginica.

![](https://ai-studio-static-online.cdn.bcebos.com/8bdc417331ef45d5a380d2769f3a8bcd7b361212b20d4e78b2a32ee9c7a7b1fa)

**First, import the necessary packages:**

**numpy**: A third-party library for scientific computing in Python.

**matplotlib**: A third-party library for visualization in Python.

**sklearn**: An important machine learning library in Python that provides various machine learning algorithms, such as classification, regression, dimensionality reduction, and clustering.

```python
import numpy as np
from matplotlib import colors
from sklearn import svm
from sklearn.svm import SVC
from sklearn import model_selection
import matplotlib.pyplot as plt
import matplotlib as mpl
```

## **Step 1: Data Preparation**

(1) Load the data from the specified path.

(2) Split the loaded data into training and testing sets. `x_train`, `x_test`, `y_train`, and `y_test` represent the training set features, training set labels, testing set features, and testing set labels, respectively.

```python
# Convert strings to integers for data loading
def iris_type(s):
    it = {b'Iris-setosa': 0, b'Iris-versicolor': 1, b'Iris-virginica': 2}
    return it[s]
```

```python
# Load data
data_path = './iris.data'  # Path to the data file
data = np.loadtxt(data_path, dtype=float, delimiter=',', converters={4: iris_type})

# Data split
x, y = np.split(data, (4,), axis=1)
x = x[:, 0:2]  # Take the first two columns as features for visualization purposes

x_train, x_test, y_train, y_test = model_selection.train_test_split(
    x, y, random_state=1, test_size=0.3)
```

Setting `random_state=1` ensures that the random numbers used for data splitting are the same each time the program is run. This ensures consistency in the training and testing sets generated each time. Without setting this, different random seeds would result in different random numbers being generated, leading to inconsistent training and testing sets each time.


## **Step 2: Model Construction**

A larger value of C penalizes the slack variables more, aiming to reduce the slack variables and achieve a higher accuracy on the training set. However, this may result in weaker generalization performance.

A smaller value of C reduces the penalty for misclassifications, allowing for more tolerance and treating them as noise points. This leads to better generalization performance.

When `kernel='linear'`, it uses the linear kernel.

When `decision_function_shape='ovr'`, it uses the "one vs. rest" strategy, where each class is considered as a separate binary classification problem against the rest of the classes.

When `decision_function_shape='ovo'`, it uses the "one vs. one" strategy, where each pair of classes is considered as a separate binary classification problem to simulate the multi-class result using binary classification.

```python
#**********************SVM Classifier Construction*************************
def classifier():
    #clf = svm.SVC(C=0.8,kernel='rbf', gamma=50,decision_function_shape='ovr')
    clf = svm.SVC(C=0.5,                         # Penalty parameter C, default value is 1
                  kernel='linear',               # Linear kernel, kernel="rbf": Gaussian kernel
                  decision_function_shape='ovr') # Decision function
    return clf
```

```python
# 2. Model definition: SVM model definition
clf = classifier()
```

## **Step 3: Model Training**

```python
y_train.ravel()  # Flatten the array to convert it from 2D to 1D
```

```
array([2., 0., 0., 0., 1., 0., 0., 2., 2., 2., 2., 2., 1., 2., 1., 0., 2.,
       2., 0., 0., 2., 0., 2., 2., 1., 1., 2., 2., 0., 1., 1., 2., 1., 2.,
       1., 0., 0., 0., 2., 0., 1., 2., 2., 0., 0., 1., 0., 2., 1., 2., 2.,
       1., 2., 2., 1., 0., 1., 0., 1., 1., 0., 1., 0., 0., 2., 2., 2., 0.,
       0., 1., 0., 2., 0., 2., 2., 0., 2., 0., 1., 0., 1., 1., 0., 0., 1.,
       0., 1., 1., 0., 1., 1., 1., 1., 2., 0., 0., 2., 1., 2., 1., 2., 2.,
       1., 2., 0.])
```

```python
#***********************Model Training*****************************
def train(clf,x_train,y_train):
    clf.fit(x_train,         # Training set features, fit to start the input data fitting
            y_train.ravel()) # Training set target values, ravel() flattens the array from 2D to 1D
```

```python
# 3. Train the SVM model
train(clf,x_train,y_train)
```


## **Step 4. Model Evaluation**

```python
#************** Check if a and b are equal, calculate the mean accuracy *************
def show_accuracy(a, b, tip):
    acc = a.ravel() == b.ravel()
    print('%s Accuracy: %.3f' %(tip, np.mean(acc)))
```

```python
def print_accuracy(clf, x_train, y_train, x_test, y_test):
    # Print the accuracy of the training and test sets separately
    # score(x_train, y_train): Represents the accuracy of outputting x_train and y_train on the model
    print('Training prediction: %.3f' %(clf.score(x_train, y_train)))
    print('Test data prediction: %.3f' %(clf.score(x_test, y_test)))
    # Compare the original results with the predicted results
    # predict() predicts the class of x_train samples and returns the sample category
    show_accuracy(clf.predict(x_train), y_train, 'Training data')
    show_accuracy(clf.predict(x_test), y_test, 'Testing data')
    # Calculate the decision function value, which represents the distance from x to each separating plane
    # There are 3 decision functions for 3 classes, different multi-class situations have different decision functions
    print('Decision function:\n', clf.decision_function(x_train))
```

```python
# 4. Model evaluation
print_accuracy(clf, x_train, y_train, x_test, y_test)
```

```
trianing prediction:0.819
test data prediction:0.778
traing data Accuracy:0.819
testing data Accuracy:0.778
decision_function:
 [[-0.5         1.20887337  2.29112663]
 [ 2.06328814 -0.0769677   1.01367956]
 [ 2.16674973  0.91702835 -0.08377808]
 [ 2.11427813  0.99765248 -0.11193061]
 [ 0.9925538   2.06392138 -0.05647518]
 [ 2.11742969  0.95255534 -0.06998503]
 [ 2.05615004 -0.041847    0.98569697]
 [-0.31866596  1.02685964  2.29180632]
 [-0.27166251  1.09150338  2.18015913]
 [-0.37827567  1.14260447  2.2356712 ]
 [-0.22150749  1.11104997  2.11045752]
 [-0.18331208  2.10066724  1.08264485]
 [-0.05444966  0.99927764  2.05517201]
 [-0.46977766  1.17853774  2.29123992]
 [-0.05760122  2.04437478  1.01322644]
 [ 2.1747228   0.93698124 -0.11170404]
 [-0.13315707  2.12021384  1.01294323]
 [-0.21752096  2.12102642  1.09649454]
 [ 2.11427813  0.99765248 -0.11193061]
 [ 2.16359817  0.96212549 -0.12572366]
 [-0.21038286  1.08590572  2.12447714]
 [ 2.21291822  0.9265985  -0.13951672]
 [-0.13399204  1.06514025  2.06885179]
 [-0.18016052  1.0555701   2.12459042]
 [-0.2334671   1.08112064  2.15234646]
 [-0.08782356  2.0747104   1.01311315]
 [-0.20324476  1.05078502  2.15245974]
 [-0.11489433  1.05994888  2.05494545]
 [ 2.17787437 -0.1081159   0.93024154]
 [-0.23578369  2.18129137  1.05449232]
 [-0.20639632  1.09588216  2.11051416]
 [-0.21038286  1.08590572  2.12447714]
 [-0.02969547  2.11420989  0.91548558]
 [-0.12685394  1.03001955  2.09683439]
 [-0.09496166  2.1098311   0.98513056]
 [ 2.10547008 -0.07737399  0.97190391]
 [ 2.11029159  0.98767604 -0.09796763]
 [ 2.20411017 -0.14842797  0.9443178 ]
 [-0.20324476  1.05078502  2.15245974]
 [ 2.19066895  0.97688701 -0.16755596]
 [-0.16022784  2.10545232  1.05477553]
 [-0.23661866  1.12621778  2.11040088]
 [-0.09579663  2.05475752  1.04103911]
 [ 2.11344315 -0.05742111  0.94397795]
 [ 2.10231852  0.96772315 -0.07004167]
 [-0.12203243  2.09506958  1.02696285]
 [ 2.11029159  0.98767604 -0.09796763]
 [-0.41248455  1.16296364  2.2495209 ]
 [-0.16820091  1.08549943  2.08270149]
 [-0.42045762  1.14301076  2.27744686]
 [-0.24857827  1.09628845  2.15228982]
 [-0.27796564  2.18169766  1.09626798]
 [-0.09264507  1.00966038  2.08298469]
 [-0.25339978  1.03123843  2.22216135]
 [-0.05361468  2.05435123  0.99926346]
 [ 2.15395516 -0.16797456  1.01401941]
 [-0.12203243  2.09506958  1.02696285]
 [ 2.06579305  1.08825305 -0.15404611]
 [-0.11007283  2.12499891  0.98507392]
 [-0.27166251  1.09150338  2.18015913]
 [ 2.13652739  0.94736397 -0.08389137]
 [-0.29789831  1.13181544  2.16608287]
 [ 2.15163856  0.93219616 -0.08383473]
 [ 2.1747228   0.93698124 -0.11170404]
 [-0.11174277  1.01485174  2.09689103]
 [-0.06872585  2.06951904  0.99920682]
 [-0.23745364  1.0711442   2.16630944]
 [ 2.12141623  0.96253178 -0.08394801]
 [ 2.1627632  -0.09294809  0.93018489]
 [-0.06557429  1.0244219   2.04115239]
 [ 2.16758471  0.97210193 -0.13968664]
 [-0.12203243  2.09506958  1.02696285]
 [ 2.1293893   0.98248467 -0.11187396]
 [-0.21038286  1.08590572  2.12447714]
 [ 2.01962457  1.0786829  -0.09830747]
 [ 2.18269588  0.95693412 -0.13963   ]
 [-0.16106282  1.05037873  2.11068408]
 [ 2.20976665  0.97169564 -0.1814623 ]
 [-0.03850351  2.03918342  0.9993201 ]
 [ 2.17555778  0.99205482 -0.1676126 ]
 [-0.11007283  2.12499891  0.98507392]
 [-0.07502898  2.15971332  0.91531566]
 [ 2.13254086  0.93738753 -0.06992839]
 [ 2.09518042  1.00284385 -0.09802427]
 [ 1.0045134   2.09385071 -0.09836411]
 [ 2.24314055  0.89626288 -0.13940344]
 [-0.09579663  2.05475752  1.04103911]
 [-0.14910321  1.08030806  2.06879515]
 [ 2.13652739  0.94736397 -0.08389137]
 [-0.2334671   1.08112064  2.15234646]
 [-0.07271239  2.05954259  1.0131698 ]
 [-0.2739791   2.1916741   1.082305  ]
 [-0.27564905  1.08152693  2.19412211]
 [-0.12203243  2.09506958  1.02696285]
 [ 2.06013657 -0.03187056  0.97173399]
 [ 2.07608272  1.00803521 -0.08411793]
 [-0.19443672  2.12581149  1.06862523]
 [-0.16421438  2.09547587  1.06873851]
 [-0.3440668   1.12224529  2.22182151]
 [-0.1180459   2.10504603  1.01299987]
 [-0.20240979  1.10585861  2.09655118]
 [-0.17617399  1.06554654  2.11062744]
 [-0.2477433   2.15136204  1.09638126]
 [-0.2334671   1.08112064  2.15234646]
 [ 2.11029159  0.98767604 -0.09796763]]
```


## **Step 5. Model Usage**

The purpose of `np.mgrid` is to generate all possible combinations of 200x200 samples using the maximum and minimum ranges of the first two features. It traverses all possible combinations of these two features, with a granularity of 1/200.

```python
def draw(clf, x):
    iris_feature = 'sepal length', 'sepal width', 'petal length', 'petal width'
    # Start plotting
    x1_min, x1_max = x[:, 0].min(), x[:, 0].max()               # Range of the first column
    x2_min, x2_max = x[:, 1].min(), x[:, 1].max()               # Range of the second column
    x1, x2 = np.mgrid[x1_min:x1_max:200j, x2_min:x2_max:200j]   # Generate grid sampling points: start coordinate: end coordinate (excluding): step size
    # Flat converts the 2D array into a 1D iterator, and matches all possible values of x1 and x2 as sample points
    grid_test = np.stack((x1.flat, x2.flat), axis=1)            # stack(): Join a series of arrays along a new axis, adding two arrays vertically (by column). Shape of grid_test: (40000, 2)
    print('grid_test:\n', grid_test)
    # Output the distance from the samples to the decision plane
    z = clf.decision_function(grid_test)
    print('the distance to decision plane:\n', z)
  
    grid_hat = clf.predict(grid_test)                           # Predict the classification values and get [0, 0, ..., 2, 2, 2]
    print('grid_hat:\n', grid_hat)  
    grid_hat = grid_hat.reshape(x1.shape)                       # Reshape grid_hat to match the shape of x1
                                                                # If e is a 3x3 matrix, then e.shape() is 3x3, indicating 3 rows and 3 columns
    # cm_light represents the color scheme for the grid test points, which acts as the background
    # cm_dark represents the color scheme for the sample points
    cm_light = mpl.colors.ListedColormap(['#A0FFA0', '#FFA0A0', '#A0A0FF'])
    cm_dark = mpl.colors.ListedColormap(['g', 'b', 'r'])
    # Plot the classification predicted for all grid sample points as the background
    plt.pcolormesh(x1, x2, grid_hat, cmap=cm_light)                                   # pcolormesh(x, y, z, cmap) Parameters here:
                                                                                      # x1, x2, grid_hat, cmap=cm_light are used to draw the background.
    # Squeeze removes the dimensions of y with a count of 1, making it one-dimensional.
    plt.scatter(x[:, 0], x[:, 1], c=np.squeeze(y), edgecolor='k', s=50, cmap=cm_dark) # Sample points
    plt.scatter(x_test[:, 0], x_test[:, 1], s=200, facecolor='yellow', zorder=10, marker='+')       # Test points
    plt.xlabel(iris_feature[0], fontsize=20)
    plt.ylabel(iris_feature[1], fontsize=20)
    plt.xlim(x1_min, x1_max)
    plt.ylim(x2_min, x2_max)
    plt.title('SVM in Iris Data Classification', fontsize=30)
    plt.grid()
    plt.show()
```

```python
# 5. Model usage
draw(clf, x)
```

```
grid_test:
 [[4.3       2.       ]
 [4.3       2.0120603]
 [4.3       2.0241206]
 ...
 [7.9       4.3758794]
 [7.9       4.3879397]
 [7.9       4.4      ]]
the distance to decision plane:
 [[ 2.04663576  1.0980928  -0.14472856]
 [ 2.04808477  1.09663836 -0.14472313]
 [ 2.04953377  1.09518392 -0.1447177 ]
 ...
 [-0.21454554  0.96016146  2.25438408]
 [-0.21309653  0.95870702  2.25438951]
 [-0.21164753  0.95725258  2.25439495]]
grid_hat:
 [0. 0. 0. ... 2. 2. 2.]
```

![png](https://res.cloudinary.com/bravey/image/upload/v1583399979/blog/machine-learning/output_22_1.png)
