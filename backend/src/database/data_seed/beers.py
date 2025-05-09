from src.database import static_files_source
from src.models.product import ProductIn, TypeEnum

beers: list[ProductIn] = [
    ProductIn(
        name="Cerveja Leopoldina Barley Wine Turfada",
        description=(
            "A Leopoldina Barley Wine Turfada reflete toda imperialidade e nobreza que a marca "
            "carrega em sua história. Inspirada na expertise enológica do grupo Famiglia Valduga, "
            "este ícone da cerveja brasileira maturou por 24 meses nos tanques de inox da Brewine "
            "Leopoldina e mais 24 meses em barricas de carvalho americano, usadas anteriormente "
            "para envelhecimento de Whisky Turfado."
        ),
        price=649,
        brand="Leopoldina",
        type=TypeEnum.beer,
        alcohol_content=14,
        ibu=10,
        disponible=True,
        source="botar imagem na pasta",
        quantity=5,
        volume=700,
    ),
    ProductIn(
        name="Cerveja Corona Extra",
        description=(
            "Corona Extra é a cerveja mais vendida e a marca mais exportada do México. Esta cerveja "
            "do tipo Pilsen foi produzida pela primeira vez em 1925 pela Cervecería Modelo, localizada "
            "na Cidade do México. Possui sabor leve de baixa graduação alcoólica. Uma fatia de limão "
            "no gargalo reforça a acidez com suas doses cítricas, fazendo com que a experiência de tomar "
            "a Corona se torne especial. Corona não é só uma cerveja, é um estilo de vida. Um convite para "
            "se desconectar da rotina e aproveitar mais a vida lá fora, na praia e curtindo um pôr do sol com os amigos."
        ),
        price=9.45,
        brand="Grupo Modelo",
        type=TypeEnum.beer,
        alcohol_content=4.6,
        ibu=18,
        disponible=True,
        source="botar imagem na pasta",
        quantity=600,
        volume=330,
    ),
    ProductIn(
        name="Patagonia Bohemian Pilsener",
        description=(
            "A Patagonia Bohemian Pilsener é uma tradicional cerveja do tipo Pilsen. Ela é produzida "
            "com o lúpulo tcheco Saaz que proporciona um aroma fresco e frutado bem característico, além "
            "de uma coloração dourada profunda. Escolha pratos com frutos do mar e peixes, como anchovas ou "
            "bacalhau, para combinar com o sabor dessa cerveja argentina."
        ),
        price=19.50,
        brand="Patagonia",
        type=TypeEnum.beer,
        alcohol_content=5.2,
        ibu=18,
        disponible=True,
        source="botar imagem na pasta",
        quantity=400,
        volume=740,
    ),
    ProductIn(
        name="Stella Artois",
        description=(
            "A receita de Stella Artois foi criada, originalmente, como um presente de Natal para os habitantes "
            "da pequena cidade de Leuven, na Bélgica. Cristalina, recebeu o nome de Stella, estrela em Latim. "
            "Sua receita única produz uma cerveja com aromas suaves e notas maltadas. A experiência e a tradição "
            "cervejeira de mais de 600 anos resultam em uma lager muito bem equilibrada. Uma cerveja de sabor intenso "
            "e com final suave. Stella Artois foi criada para ser saboreada."
        ),
        price=10.75,
        brand="Anheuser-Busch InBev",
        type=TypeEnum.beer,
        alcohol_content=5,
        ibu=16,
        disponible=True,
        source="botar imagem na pasta",
        quantity=800,
        volume=550,
    ),
    ProductIn(
        name="Caracu",
        description=(
            "Caracu, a cerveja preta FORTE E GOSTOSA, foi lançada em 1899. Hoje uma das marcas mais tradicionais do "
            "Brasil, Caracu é conhecida por seu sabor encorpado e sua energia, possui aroma de malte torrado, que faz "
            "lembrar café. E sua fama de ser uma cerveja forte não é à toa. Por não ser filtrada, Caracu é mais nutritiva, "
            "contém levedura e proteínas."
        ),
        price=12,
        brand="Ambev",
        type=TypeEnum.beer,
        alcohol_content=5.4,
        ibu=22,
        disponible=True,
        source="botar imagem na pasta",
        quantity=150,
        volume=355,
    ),
    ProductIn(
        name="Budweiser",
        description=(
            "O processo de produção da Budweiser é diferenciado, por utilizar lascas de Beechwood (madeira especial) durante "
            "os processos de fermentação e maturação. O resultado é uma cerveja de sabor único e com equilíbrio perfeito: "
            "marcante no início e suave no final."
        ),
        price=7.20,
        brand="Anheuser-Busch",
        type=TypeEnum.beer,
        alcohol_content=5,
        ibu=10,
        disponible=True,
        source="botar imagem na pasta",
        quantity=600,
        volume=550,
    ),
    ProductIn(
        name="Quilmes",
        description=(
            "Uma cerveja equilibrada e refrescante, a Quilmes é produzida com alto padrão de qualidade. Seu sabor segue o "
            "aroma suave de cereais, com malte e lúpulo em equilíbrio. Como uma boa pilsen, tende a ser mais leve na cor e "
            "tem a drinkability como marca registrada."
        ),
        price=8,
        brand="Cervecería y Maltería Quilmes",
        type=TypeEnum.beer,
        alcohol_content=5,
        ibu=14.3,
        disponible=True,
        source="botar imagem na pasta",
        quantity=600,
        volume=340,
    ),
    ProductIn(
        name="Brahma Chopp",
        description=(
            "A Brahma está no Brasil desde 1888. Nasceu lá na Sapucaí, no Rio de Janeiro. E de lá cresceu para o mundo, para "
            "levar o sabor autêntico de cerveja brasileira, com espuma cremosa e persistente, amargor presente e ligeiramente encorpada."
        ),
        price=20,
        brand="Ambev",
        type=TypeEnum.beer,
        alcohol_content=4.8,
        ibu=10,
        disponible=True,
        source="botar imagem na pasta",
        quantity=1000,
        volume=340,
    ),
]
