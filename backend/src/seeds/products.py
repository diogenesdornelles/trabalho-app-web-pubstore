from src.models.product import ProductIn
from src.models.product import TypeEnum

products: list[ProductIn] = [
    ProductIn(
        name="Chopp SUD PREMIUM LAGER puro malte 500ml",
        description="""A primeira Pilsen artesanal da Serra Gaúcha em embalagem família!
          Aroma ligeiramente adocicado, corpo leve e refrescante, amargor perene 
          de lúpulos Alemães nobres. A cerveja clássica que carrega o espírito Sul-Riograndense.""",
        alcohol_content=5,
        brand="SUD",
        ibu=12,
        price=15,
        type=TypeEnum.chopp,
        disponible=True,
        source="http://127.0.0.1:8080/src/static/chopp_sud_500.png",
        quantity=10,
        volume=500,
    ),
    # ProductIn(
    #     name="Chopp SUD IPA 1L",
    #     description="""A SUD IPA internacionalmente premiada em uma embalagem feita para dividir,
    #       como entendiam os criadores do estilo. Aroma intenso de abacaxi, toranja e resina 
    #       proveniente do blend de lúpulos americanos utilizado no Dry Hopping. Amargor marcante 
    #       mas redondo, faz essa cerveja impactante e extremamente bebível.""",
    #     price=17,
    #     brand="SUD",
    #     type="chopp",
    #     alcohol_content=6.4,
    #     ibu=60,
    #     disponible=True,
    #     source=None,
    #     quantity=100,
    #     volume=1000,
    # ),
    # ProductIn(
    #     name="Chopp SUD PREMIUM LAGER puro malte 500ml",
    #     description="""A primeira Pilsen artesanal da Serra Gaúcha em embalagem família!
    #       Aroma ligeiramente adocicado, corpo leve e refrescante, amargor perene de lúpulos
    #         Alemães nobres. A cerveja clássica que carrega o espírito Sul-Riograndense.""",
    #     alcohol_content=5,
    #     ibu=12,
    #     price=15,
    #     brand="SUD",
    #     type="chopp",
    #     disponible=True,
    #     source=None,
    #     quantity=0,
    #     volume=500,
    # ),
    # ProductIn(
    #     name="Chopp SUD IPA 1L",
    #     description="""A SUD IPA internacionalmente premiada em uma embalagem feita para dividir,
    #     como entendiam os criadores do estilo. Aroma intenso de abacaxi, toranja e resina proveniente 
    #     do blend de lúpulos americanos utilizado no Dry Hopping. Amargor marcante mas redondo, 
    #     faz essa cerveja impactante e extremamente bebível.""",
    #     price=17,
    #     type="chopp",
    #     brand="SUD",
    #     alcohol_content=6.4,
    #     ibu=60,
    #     disponible=True,
    #     source=None,
    #     quantity=100,
    #     volume=1000,
    # ),
]
