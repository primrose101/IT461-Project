from collections import OrderedDict

from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.utils.urls import replace_query_param, remove_query_param


class HeaderLimitOffsetPagination(LimitOffsetPagination):
    def get_paginated_response(self, data):
        next_url = self.get_next_link()
        previous_url = self.get_previous_link()
        first_url = self.get_first_link()
        last_url = self.get_last_link()

        links = []
        for label, url in (
            ("first", first_url),
            ("next", next_url),
            ("previous", previous_url),
            ("last", last_url),
        ):
            if url is not None:
                links.append('<{}>; rel="{}"'.format(url, label))

        headers = {"Link": ", ".join(links)} if links else {}

        return Response(
            OrderedDict(
                [
                    ("count", self.count),
                    ("first", first_url),
                    ("next", next_url),
                    ("previous", previous_url),
                    ("last", last_url),
                    ("results", data),
                ]
            ),
            headers=headers,
        )

    def get_first_link(self):
        if self.offset <= 0:
            return None
        url = self.request.build_absolute_uri()
        return remove_query_param(url, self.offset_query_param)

    def get_last_link(self):
        if self.offset + self.limit >= self.count:
            return None
        url = self.request.build_absolute_uri()
        url = replace_query_param(url, self.limit_query_param, self.limit)
        offset = self.count - (self.count%self.limit)
        if offset == self.count:
            offset-=self.limit
        return replace_query_param(url, self.offset_query_param, offset)